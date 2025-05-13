const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_jwt_secret_key'; // should match the one in userRoutes.js

module.exports = function (req, res, next) {
    const authHeader = req.headers['authorization'];

    // Check if token is present
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.user; // save user data in request
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};
