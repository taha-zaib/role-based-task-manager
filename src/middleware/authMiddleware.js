const jwt = require('jsonwebtoken');

const verifyTokens = (req, res, next) => {
    try {
        //get token from header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "No token provided"
            })
        }

        //extract token
        const token = authHeader.split(' ')[1];

        //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //attahc user data to request
        req.user = decoded;

        //continue to next middleware or controller
        next();

    } catch (error) {
        res.status(401).json({
            message: error.message
        })
    }
}

module.exports = verifyTokens;