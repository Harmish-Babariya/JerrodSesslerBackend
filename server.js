// to convert bigint to interger for response as express dont support bigint
BigInt.prototype.toJSON = function () {
    const int = Number.parseInt(this.toString());
    return int ?? this.toString();
};

// import express from 'express';
// import cors from 'cors';
// import path from 'path';
const express = require('express')
const cors = require('cors')
const path = require('path')

const Port = process.env.PORT || 4000;

const app = express()
// use middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// log all requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} ${JSON.stringify(req.body)}`);
    next();
});

// * Routes file
const routes = require("./src/routes/index");
app.use(routes);

// serve express app
const server = app.listen(Port, () => {
    console.log(`server is running at port http://localhost:${Port}`);
});