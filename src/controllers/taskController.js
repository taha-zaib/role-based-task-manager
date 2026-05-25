const Task = require('../models/Task')

const createTask = async (req, res) => {

    try {

        const { title } = req.body

        const task = await Task.create({
            title,
            createdBy: req.user.id
        })

        res.status(201).json({
            success: true,
            task
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

}

const getMyTasks = async (req, res) => {

    try {
        const tasks = await Task.find({
            createdBy: req.user.id
        })

        res.status(200).json({
            success: true,
            tasks
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            mesage: error.message
        })
    }

}

const updateMyTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)

        //check if task exists
        if(!task) {
            res.status(404).json({
                success: false,
                message: "Task not found!"
            })
        }

        //ownership check
        if(task.createdBy.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Access denied!"
            })
        }

        //update task
        task.title = req.body.title || task.title

        if(req.body.completed !== undefined) {
            task.completed = req.body.completed
        
        }
        const updatedTask = await task.save();

        res.status(200).json({
            success: true,
            updatedTask
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)

        //check if task exists
        if(!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found!"
            })
        }

        //check ownership
        if(task.createdBy.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Access denied!"
            })
        }

        await task.deleteOne();

        res.status(200).json({
            success: true,
            message: "Task deleted successfully!"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    createTask,
    getMyTasks,
    updateMyTask,
    deleteTask
}