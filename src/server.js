const express = require("express");

const app = express();

const PORT = 5000;

app.get("/", (req, res) => {
    res.send("Role Based Task Manager Running...");
})

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}.`)
})