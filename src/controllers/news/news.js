const Joi = require('joi');

const prisma = require('../../../db/db.config');

const newsSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().min(20).required(),
    userId:Joi.required(),
}).options({ abortEarly: false });

const createNews = async (req, res, next) => {
    let { name, description, userId } = req.body;
    
    // Create new news
    const newNews = await prisma.news.create({
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

    res.status(200).json(newNews);
};

const getNews = async (req, res, next) => {
    let { userId } = req.body;
    
    // get news data
    try {
        const newNews = await prisma.news.findMany({
            where:{ userId },
            select: {
                id: true,
                name: true,
                description:true,
                userId:true,
            }
        });
        res.status(200).json(newNews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Unable to get news." });
    }
}

const getSingleNews = async (req, res, next) => {
    const { id } = req.params;

    // get single news data
    try {
        const newNews = await prisma.news.findFirst({
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
        res.status(200).json(newNews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Unable to get news." });
    }
}

const updateNews = async (req, res, next) => {
    const { id } = req.params;
    const { name, description } = req?.body

    // update news data
    try {
        const newNews = await prisma.news.update({
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
        res.status(200).json(newNews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "data not updated." });
    }
}
const deleteNews = async (req, res, next) => {
    const { id } = req.params;

    // get news data
    try {
        const newNews = await prisma.news.delete({
            where:{
                id: parseInt(id)
            }
        });
        res.status(200).json(newNews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "faild to delete." });
    }
}

module.exports = {
    createNews,
    getNews,
    getSingleNews,
    updateNews,
    deleteNews,
    newsSchema
}