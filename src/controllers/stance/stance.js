const Joi = require('joi');

const prisma = require('../../../db/db.config');

const stanceSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().min(20).required(),
    userId:Joi.required(),
}).options({ abortEarly: false });

const createStance = async (req, res, next) => {
    let { name, description, userId } = req.body;
    
    // Create new stance
    const newStance = await prisma.stance.create({
        data: {
            name,
            description,
            userId
        },
        select: {
            id: true,
            name: true,
            description:true,
            userId:true,
        }
    });

    res.status(200).json(newStance);
};

const getStance = async (req, res, next) => {
    let { userId } = req.body;
    
    // get stance data
    try {
        const newStance = await prisma.stance.findMany({
            where:{ userId },
            select: {
                id: true,
                name: true,
                description:true,
                userId:true,
            }
        });
        res.status(200).json(newStance);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Unable to get stance." });
    }
}

const getSingleStance = async (req, res, next) => {
    const { id } = req.params;

    // get single stance data
    try {
        const newStance = await prisma.stance.findFirst({
            where:{
                id: parseInt(id)
            },
            select: {
                id: true,
                name: true,
                description:true,
                userId:true,
            }
        });
        res.status(200).json(newStance);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Unable to get stance." });
    }
}

const updateStance = async (req, res, next) => {
    const { id } = req.params;
    const { name, description } = req?.body

    // update stance data
    try {
        const newStance = await prisma.stance.update({
            where:{
                id: parseInt(id)
            },
            data:{
                name,
                description,
            },
            select: {
                id: true,
                name: true,
                description:true,
                userId:true,
            }
        });
        res.status(200).json(newStance);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "data not updated." });
    }
}
const deleteStance = async (req, res, next) => {
    const { id } = req.params;

    // get stance data
    try {
        const newStance = await prisma.stance.delete({
            where:{
                id: parseInt(id)
            }
        });
        res.status(200).json(newStance);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "faild to delete." });
    }
}

module.exports = {
    createStance,
    getStance,
    getSingleStance,
    updateStance,
    deleteStance,
    stanceSchema
}