import expressAsyncHandler from "express-async-handler";
import Jwt from "jsonwebtoken";

const validateToken = expressAsyncHandler (async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;

    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        Jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
            try {
                if(err){
                    res.status(401);
                    throw new Error("User is not authorized");
                }
    
                req.user = decoded.user;
                next();
            } catch (error) {
                console.log("Error message: ",error.message);
                const err = new Error("Unauthorized access");
                err.status = 401;
                next(err);
                return;
            }
        });

        if(!token){
            res.status(401);
            throw new Error("User is not valid or token is expired");
        }
    }
});

export default validateToken;