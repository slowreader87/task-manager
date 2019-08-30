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
    // now need to assign the token just given back to track that session. This is done by 
    // adding a new property to the user called activeToken. So when a user logs out we can
    // log out only that session. i.e. remove that token from their user.tokens array
        req.user.activeToken = token
    // so now whenever 'auth' is added to the route it will check for the user and if successful 
    // will change the req.user to the proper user from the database with all its properties
        next()
    } catch (e){
        res.status(401).send('error: Please authenticate')
    }
}

module.exports = auth