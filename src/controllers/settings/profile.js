const Joi = require("joi");
const prisma = require("../../../db/db.config");

const updateProfileSchema = Joi.object({
    id: Joi.required(),
    name: Joi.string().required(),
    // email: Joi.string().email().required(),
    // phone: Joi.string().required(),
    // dob: Joi.date().max("now").required(),
});

const getProfile = async (req, res) => {
    try {
        const profile = await prisma.user.findUnique({
            where: {
                id: req?.body?.userId,
            },
            select: {
                id: true,
                name: true,
                email: true,
            },
        });
        res.status(200).json({ ...profile });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Unable to get profile." });
    }
};

const updateProfile = async (req, res) => {    
    console.log('id :: ', req?.body, req?.body?.userId)
    const { name, userId } = req.body;

    try {
        const updatedProfile = await prisma.user.update({
            where: { id:userId },
            data: {
                name
            },
            select: {
                id: true,
                name: true,
                email: true,
            },
        });
        res.status(200).json(updatedProfile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Unable to update profile." });
    }
};


module.exports = {
    getProfile,
    updateProfile,
    updateProfileSchema
};