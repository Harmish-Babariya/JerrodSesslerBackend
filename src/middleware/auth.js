const status = require('http-status');
const prisma = require("../../db/db.config");

let getTokenBearer = (token) => {
    const AUTH_HEADER_TYPES = ["Bearer"];
    let tokenBearer = token.split(" ");

    if (tokenBearer.length != 2) return null;

    if (!AUTH_HEADER_TYPES.includes(tokenBearer[0])) return null;

    return tokenBearer[1];
};


const userVerifyToken = async (req, res, next) => {
    let token = req.headers["authorization"];

    if (!token) {
        return res.status(status.UNAUTHORIZED).json({
            message: "No token provided!"
        });
    }

    let tokenBearer = getTokenBearer(token);

    if (!tokenBearer) {
        return res.status(status.UNAUTHORIZED).json({
            message: "Invalid token!"
        });
    }

    // verify token
    let token_data = await prisma.user.findFirst({
        where: {
            token: tokenBearer
        },
        select: {
            id:true
        }
    })

    if (!token_data) {
        return res.status(status.UNAUTHORIZED).json({
            message: "Invalid token!"
        });
    }
    req.body.userId = token_data?.id

    console.log('tokendata :: ', req.body, token_data)
    // req.physio = token_data.physio;
    // req.clinic = token_data.clinic;

    next();
};

module.exports = { 
    userVerifyToken
};