const jwt=require("jsonwebtoken");
const util=require("util"); 
const authenticate=function(req,res,next){
    const response={
        status:403,
        message:"No Token Provided"
    }
    const headerExists=req.headers.authorization;
    if(headerExists){
        const token=req.headers.authorization.split(" ")[1];
        const jwtVerfiyPromise=util.promisify(jwt.verify,{context:jwt});
        jwtVerfiyPromise(token,process.env.JWT_PASSWORD)
            .then(()=>{next();})
            .catch(err =>_invalidAutrhorisationToken(err,response))
    } else{
        _sendResponse(res,response);
    }        
}

_invalidAutrhorisationToken=function(error,res,response){
    console.log(error);
    response.status=401;
    response.message="Unauthorized"
    this._sendResponse(res,response);
}

_sendResponse=function(res,response){
    res.status(response.status).json(response.message);
}

module.exports={
    authenticate
}
