// import { PrismaClient } from "@prisma/client";
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  // log: ['query', 'info', 'error'],
});

module.exports = prisma;