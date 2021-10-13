const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        if (req.headers.authorization.split(' ')[1])
            token = req.headers.authorization.split(' ')[1]
        else {
            token = req.headers.authorization.replace('Bearer', '')
        }
        console.log(token)
        const decodedToken = jwt.verify(token, 'bWFzdXBlcmNsZXNlY3JldGVwb3VydG9rZW5tYWdpcXVlcXVlcGVyc29ubmVpbHBldXRsYWRldmluZXI=');
        console.log(decodedToken)
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {

            throw 'Invalid user ID';
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({
            error: error,
            token: req.headers.authorization.split(' ')[1]

        });
    }
};