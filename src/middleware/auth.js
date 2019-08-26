const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
    // grab the token offered by the client within the headers portion of request
    // stripping off the leading 'Bearer '
        const token = req.header('Authorization').replace('Bearer ', '')
    // decode the token using the secret
        const decoded = jwt.verify(token, 'somesecret')
    // search for user with those details
        const user = await User.findOne({_id: decoded._id, 'tokens.token':token})
    // if no user is found throw an new Error object
        if(!user) {
            throw new Error
        }
    // otherwise set the req.user object to the user found in the database
    // (which has more stuff on it than just what came from the request)
        req.user = user
    // so now whenever 'auth' is added to the route it will change the req.user object if auth
    // is successful. It will be the proper user from the database not just the submitted object
    // from the client request
        next()
    } catch (e){
        res.status(401).send('error: Please authenticate')
    }
}

module.exports = auth