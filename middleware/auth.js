const jwt = require("jsonwebtoken")
const config = require("config")

module.exports = function(req, res, next){
    console.log("this is middleware");
    console.log("Req.headers");
    
    console.log(req.headers);
    
    const token = req.headers["x-access-token"] ||  req.headers["authorization"];

    if (!token) return res.status(401).send("Access denied. No token provided.");

    try{
        const decoded = jwt.verify(token, config.get("myprivatekey"))
        console.log("decoded");
        console.log(decoded);
        
        
    req.user = decoded;
    next();
    }catch (ex){
        res.status(400).send("Invalid token");
    }
}