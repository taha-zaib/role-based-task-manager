const express = require('express')
const router = express.Router()

const verifyToken = require('../middleware/authMiddleware')

const { createTask, getMyTasks, updateMyTask, deleteTask } = require('../controllers/taskController')

router.post('/', verifyToken, createTask)
router.get('/', verifyToken, getMyTasks)
router.put('/:id', verifyToken, updateMyTask)
router.delete('/:id', verifyToken, deleteTask)

module.exports = router