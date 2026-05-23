const express = require('express')
const router = express.Router()

const verifyToken = require('../middleware/authMiddleware')
const authorizeRoles = require('../middleware/roleMiddleware')

const { getAllUsers, promoteUser, deleteAnyUserTasks } = require('../controllers/adminController')

router.get('/users', verifyToken, authorizeRoles('admin'), getAllUsers)
router.patch('/users/:id/promote', verifyToken, authorizeRoles('admin'), promoteUser)
router.delete('/tasks/:id', verifyToken, authorizeRoles('admin'), deleteAnyUserTasks)

module.exports = router