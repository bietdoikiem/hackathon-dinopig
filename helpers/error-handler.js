module.exports = errorHandler;

function errorHandler(err, req, res, next) {
    if (typeof (err) === 'string') {
        //custom application error
        return res.status(400).json({
            msg: err
        });
    }

    if(err.name === "UnauthorizedError") {
        //jwt auth error
        return res.status(401).json({msg: 'Invalid token'});
    }

    //default to 500 server error
    return res.status(500).json({msg: err.message});
}