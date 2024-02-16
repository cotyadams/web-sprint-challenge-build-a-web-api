// Write your "projects" router here!
const express = require("express");
const projectsRouter = express.Router();
const Projects = require("./projects-model.js");
const { checkId } = require("./projects-middleware.js");
// needed values in req.body
// name, description

projectsRouter.get("/", async (req, res) => {
    const projects = await Projects.get();
    if (projects.length > 0) {
        res.status(200).json(projects);
    } else res.status(404).json([]);
})

projectsRouter.get("/:id", checkId, async (req, res) => { 
    const { id } = req.params;
    const project = await Projects.get(id);
    if (project) { 
        res.status(200).json(project);
    } else res.status(404).json({message: "Project not found"});
})

projectsRouter.post("/", async (req, res) => {
    const { name, description } = req.body;
    if (name && description) { 
        Projects.insert({ name, description })
            .then(project => { 
                res.status(201).json(project);
            })
    } else res.status(400).json({message: "Please provide the correct required fields"});
})
 
projectsRouter.put("/:id", async (req, res) => { 
    const { id } = req.params;
    const { name, description } = req.body;
    if (name || description) {
        Projects.update(id, {
            name: name? name: '',
            description: description ? description: ''
        }).then((project) => {
            if (project) {
                res.status(200).json(project);
            } else res.status(404).json({message: "Project not found"});
        })
     }
})

projectsRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    if (id) { 
        Projects.remove(id)
            .then(() => {
                res.status(204).json({message: "Project deleted"});
            }).catch(() => {
                res.status(500).json({message: "issue deleting project"});
            })
    }
    
})
 
projectsRouter.get("/:id/actions", checkId, async (req, res) => { 
    const { id } = req.params;
    const actions = await Projects.getProjectActions(id);
    if (actions.length > 0) {
        res.status(200).json(actions);
    } else res.status(404).json({message: "No actions found for this project"});
})

module.exports = projectsRouter;