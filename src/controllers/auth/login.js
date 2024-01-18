const bcrypt = require('bcryptjs');
const Joi = require('joi');

const prisma = require('../../../db/db.config');
const generateRandomToken = require('../../utils/token-generate');

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
}).options({ abortEarly: false });

const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        // Find the user with the specified code
        const user = await prisma.user.findUnique({
            where: { email },
            select: {
                id:true,
                password:true
            }
        });

        // If the user does not exist, return an error
        if (!user) {
            return res.status(404).json({ error: 'user not found.' });
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                non_field_error: 'Invalid credentials'
            });
        }

        let token = generateRandomToken(32);
        const exp = new Date().getTime() + 24 * 24 * 60 * 60 * 1000;

        try {
            const updateUser = await prisma.user.update({
                where: {
                    id: user.id,
                },
                data: { token },
                select: {
                    name: true,
                    email: true,
                    token: true
                },
            });    
            // Return the token
            return res.status(200).json({...updateUser});
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Unable to update profile." });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Something went wrong.' });
    }
};

module.exports = {
    login,
    loginSchema
}