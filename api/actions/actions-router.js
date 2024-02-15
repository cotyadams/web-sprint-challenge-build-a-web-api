// Write your "actions" router here!
// import express
const express = require("express");
const actionsRouter = express.Router();


// importing actions model
const actions = require("./actions-model.js");

// importing projects model
const project = require("../projects/projects-model.js");


// request handlers
actionsRouter.get("/", async (req, res) => {
    res.status(200).json(await actions.get());
})
 
actionsRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    let action = await actions.get(id);
    if (!action) {
        res.status(404).send('Action not found');
     }
    else res.status(200).json(action);
})

actionsRouter.post("/", async (req, res) => {
    const projectExists = !!await project.get(req.body.project_id);
    
    if (req.body.description &&
        projectExists &&
        req.body.project_id &&
        req.body.notes) { 
            const newAction = await actions.insert(req.body);
            res.status(201).json(newAction);
        }
    else {
        res.status(400).send('Please provide the correct required fields');
    }
})

actionsRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    const projectExists = !!await project.get(req.body.project_id);
    if (projectExists) { 
        const actionExists =!!await actions.get(id);
        if (actionExists && req.body) {
            const updatedAction = await actions.update(id, req.body);
            res.status(200).json(updatedAction);
        } else if (!actionExists) {
            res.status(404).send('Action not found');
        } else if (!req.body) {
            res.status(400).send('Please provide the correct required fields');
        }
    } else res.status(400).send('invalid project id');
    
})
 
actionsRouter.delete("/:id", async (req, res) => { 
    const id = req.params.id;
    const actionExists =!!await actions.get(id);
    if (actionExists) {
        await actions.remove(id);
        res.status(204).send();
    } else res.status(404).send('Action not found');
})
 

module.exports = actionsRouter;