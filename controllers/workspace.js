const Task = require('../models/task');
const Project = require('../models/project');

exports.postAddTask = async (req, res, next) => {
    const description = req.body.description;
    const projectName = req.body.project;
    const startTime = new Date().toISOString();
    
    try {
        const project = await Project.findOne({ name: projectName });
        if (!project) {
            // create new project
            project = new Project({
                name: projectName,
                color: 'blue', //HARD-CODED
                user: req.user._id            
            })
            const newProject = await project.save();
            projectId = newProject._id;
        } else {
            projectId = project._id;
        }
    
        // create new task
        const task = new Task({
            description: description,
            project: projectId,
            startTime: startTime,
            user: req.user._id
        });
    
        const newTask = await task.save();
       
        res.status(200).json({
            message: "Task created and started!",
            result: newTask
        });

    } catch(err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getTasks = async (req, res, next) => {
    const userid = req.params.userid;
    if(!userid) {
        const error = new Error('User not found');
        error.statusCode = 400;
        throw error;
    }
    try{        
        const tasks = await Task.find({ user: userid}).populate('project');    
        res.status(200).json(tasks);
    } catch(err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getProjects = async (req, res, next) => {
    const userid = req.params.userid;
    if(!userid) {
        const error = new Error('User not found');
        error.statusCode = 400;
        throw error;
    }
    try{        
        const projects = await Project.find({ user: userid });    
        res.status(200).json(projects);
    } catch(err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};