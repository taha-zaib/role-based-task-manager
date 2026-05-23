const Users = require("../models/User")
const Task = require("../models/Task")

const getAllUsers = async (req, res) => {
    try {
        
        const users = await Users.find().select('-password')

        res.status(200).json(users)

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const promoteUser = async (req, res) => {
    try {
        
        const user = await Users.findById(req.params.id)

        if(!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if(user.role === 'admin') {
            return res.status(400).json({
                message: "Already admin!"
            })
        }

        user.role = 'admin'
        await user.save()

        await res.status(200).json({
            message: 'Role promoted successfully!'
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const deleteAnyUserTasks = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)

        if(!task) {
            return res.status(404).json({
                message: "Task not found!"
            })
        }

        await task.deleteOne()

        res.status(200).json({
            message: `Title: ${task.title} \n Task deleted Successfully!`
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    getAllUsers,
    promoteUser,
    deleteAnyUserTasks
}