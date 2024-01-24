import constants from "../constants.js";

const errorHandler = (err, req, res, next) => {
    const statusCode = err.status || 500;

    let title;
    if (statusCode == constants.FORBIDDEN) {
        title = "FORBIDDEN";
    } else if (statusCode == constants.NOT_FOUND) {
        title = "NOT_FOUND";
    } else if (statusCode == constants.SERVER_ERROR) {
        title = "SERVER_ERROR";
    } else if (statusCode == constants.UNAUTHORIZED) {
        title = "UNAUTHORIZED";
    } else if (statusCode == constants.VALIDATION_ERROR) {
        title = "VALIDATION_ERROR";
    } else {
        console.log("No Error, All good");
    }
    
    
    // Use the error status if available, otherwise default to 500
    res.status(statusCode).json({
        title: title,
        message: err.message,
        stackTrace: err.stack
    });
};

export default errorHandler;