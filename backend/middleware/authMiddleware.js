const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');

const protect=async (req,resizeBy,next)=>{
    let token=req.headers.authorization;

    if(token && token.startsWith('Beared')){
        try{
            token=token.split(' ')[1];//remove bearer
            const decoded= jwt.verify(token,process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');//attach user
            next();
        }catch(error){
            res.status(401).json({message:'Invalid Token'});
        }
    } else {
        res.status(401).json({message:'Not authorized, no token'});
    }
};

module.exports = protect;