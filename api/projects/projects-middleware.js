// add middlewares here related to projects

const express = require("express");
const {get, insert, update, remove, getProjectActions} = require("./projects-model.js");
const checkId = async (req, res, next) => { 
    const { id } = req.params;
    const project = await get(id);
    if (!project) {
        res.status(400).send("Please provide a correct project id");
    } else {
        next();
    }
}
const logger = (req, res, next) => { 
    console.table({
        method: req.method,
        originalUrl: req.originalUrl,
        date: new Date().toLocaleDateString()
    });
    next();
}
module.exports = {
    checkId,
    logger
};