const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../constants');
const UserRepository = require('../repositories/UserRepository');

const AuthMiddleware = {
    authenticate: (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(403).json({
                error: 'Forbidden',
                message: 'You are not authorized to access this resource'
            });
        }
        jwt.verify(token, JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    error: 'Failed to authenticate token'
                });
            }
            req.user = await UserRepository.find(decoded.id);
            next();
        });
    }
}

module.exports = AuthMiddleware;