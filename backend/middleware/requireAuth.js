const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');

const requireAuth = async (req, res, next) => {
    // verify that the user is authenticated
    const {authorization} = req.headers;

    if (!authorization) {
        return res.status(401).json({error: "Authorization token is required"});
    }

    /*
    The token will look like (authorization):
    'Bearer sdfsdfsdfsdfdsf.rgtehgwr4thtg.gg4gwgasgryny
    */
    const token = authorization.split(' ')[1];

    try {
        // first verify that the token has not been tampered with
        // additionally, if successful we pull the id from the header of the JWT
        const {_id} = jwt.verify(token, process.env.JWT_SECRET);
    
        // attach the user id to the request 
        req.user = await User.findOne({_id}).select('_id');
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({error: "Request is not authorized"});
    }
    
};

module.exports = requireAuth;