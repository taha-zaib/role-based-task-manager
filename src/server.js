const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db')

//middleware
dotenv.config();
connectDB();
const app = express();

app.use(express.json());

const authRoutes = require('./routes/authRoutes')
app.use('/api/auth', authRoutes)
const userRoutes = require('./routes/userRoutes')
app.use('/api/users', userRoutes)
const taskRoutes = require('./routes/taskRoutes')
app.use('/api/tasks', taskRoutes)
const adminRoutes = require('./routes/adminRoutes')
app.use('/api/admin', adminRoutes)


const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("API Running...");
})

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}.`)
})