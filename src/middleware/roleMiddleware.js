const authorizeRoles = (...roles) => {
    return (req, res, next) => {

        //req.user from verifyToken middleware
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Not authenticated'
            })
        }

        //check role
        if(!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied: Insufficient permission.'
            })
        }

        next();
    }
}

module.exports = authorizeRoles;