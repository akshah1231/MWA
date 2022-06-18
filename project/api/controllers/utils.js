module.exports.checkIfParamsExists = function (req, ...params) {
    if (!req.body) {
        return false;
    }
    for (let i = 1; i < arguments.length; i++) {
        if (!req.body[arguments[i]]) {
            return false;
        }
    }
    return true; 
}


module.exports.responseRequest =  function (response, res) {
    res.status(response["status"]).json(response["message"]);
}

module.exports.onErrorMessageHandler  = function (response, statusCode, message) {
    response["status"] = statusCode, 
    response["message"] = message
}

module.exports.onSuccessMessageHandler = function (response, statusCode, message) {
    response["status"] = statusCode, 
    response["message"] = message
}

module.exports.blankPage = function(req, res) {
    res.status(200).json("not implemented page yet.");
}