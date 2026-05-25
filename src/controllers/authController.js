const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {
        
        const { name, email, password } = req.body;

        if(!password) {
            return res.status(404).json({
                success: false,
                message: "Password not found!"
            })
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Email already exists!'
            })
        }

        if(password.length < 8) {
            return res.status(400).json({
                success: false,
                message: 'Password must be atleast 8 characters long.'
            })
        }

        //Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        res.status(201).json({
            success: true,
            message:'User registered successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email"
            })
        }

        if(!password) {
            return res.status(404).json({
                success: false,
                message: "Password not found!"
            })
        }

        //compare password
        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid Password"
            })
        }

        //generate jwt token
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        )

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    registerUser,
    loginUser
};