const jwt = require('jsonwebtoken');

const validateToken = async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'Missing token or user not authorized' });
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
            if (err) {
                // Token is invalid or expired
                return res.status(401).json({ error: 'Invalid or expired token' });
            }

            // Access token is valid, extract user information from the decoded token
            const { id, username } = decoded.user;

            // Set the user information in the request object
            req.user = {id, username };

            next();
        });
    } else {
        return res.status(401).json({ error: 'User is not authorized' });
    }
};

module.exports = validateToken;
