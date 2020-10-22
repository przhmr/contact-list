const jwt = require("jsonwebtoken");

const auth=  (req,res, next) =>{

console.log(req.headers)
    const token = req.header("x-auth-token");
    if(!token)
    {
    
    return res.status(401)
    .json({msg:"Not authentication token, authorization failed "})
}

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified)
    return res.status(401)
    .json({msg:"Token verification failed "})
    
    req.user = verified.id
    next()
}


module.exports = auth;