const bcrypt = require('bcryptjs');
const Joi = require('joi');

const prisma = require('../../../db/db.config');
const generateRandomToken = require('../../utils/token-generate');

const signupSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    confirmPassword: Joi.string().min(8).required(),
}).options({ abortEarly: false });

const signup = async (req, res, next) => {
    let { name, email, password, confirmPassword } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
        return res.status(400).json({
            confirmPassword: 'Passwords do not match'
        });
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
        where: { email }
    });

    if (existingUser) {
        return res.status(400).json({
            email: 'Email already exists'
        });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    let token = generateRandomToken(32);
    // let exp = new Date() + 24 * 60 * 60 * 1000;
    const exp = new Date().getTime() + 24 * 24 * 60 * 60 * 1000;

    const expStringValue = exp.toString();

    // Create new user
    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            password,
            token,
        },
        select: {
            id: true,
            name: true,
            email: true,
            password: true,
            token:true,
        }
    });

    res.status(200).json({
        ...newUser,
        exp
    });
};

module.exports = {
    signup,
    signupSchema
}