const jwt = require('jsonwebtoken');
const logger = require('./../helper/logger.helper');
/**
 * isAuthenticated
 * @description :: Policy to chekck is requet comming from Authenticate source
 */
module.exports = async function (req, res, next) {
    let token = req.headers['authorization'];
    if (!token){        
        return res.status(505).send({ status: true, message: "Un-Authorized request" });
    }
    token = token.replace('Bearer ', '');
    jwt.verify(token, process.env.jwtsecretkey, (error, decoded) => {
        if (error) {
            // Token verification failed
            console.error('JWT verification failed:', error.message);
            return res.status(505).send({ status: true, message: "Un-Authorized request" });
        } else {
            next();
        }
    });
    
};
