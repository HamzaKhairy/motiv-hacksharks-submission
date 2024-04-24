const jwt = require('jsonwebtoken');

function authenticateToken(permission) {
    return function (req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (token == null) return res.sendStatus(401);

        jwt.verify(token, 'your_secret_key', (err, user) => {
            if (
                err
                || permission === -1
                || (permission & user.permission) !== permission) {
                    return res.sendStatus(403);
                }
            req.user = user;
            next();
        });
    }
}

module.exports = authenticateToken;
