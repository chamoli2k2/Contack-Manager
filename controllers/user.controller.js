import expressAsyncHandler from "express-async-handler";
import { User } from "../models/users.model.js";
import bcrypt from "bcrypt"
import Jwt  from "jsonwebtoken";

// @desc Register a user
// @route POST /api/users/
// @access public
const registerUser = expressAsyncHandler(async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            throw new Error("Invalid input. Please provide username, email, and password.");
        }

        const userAvailable = await User.findOne({ email, username });

        if (userAvailable) {
            throw new Error("User already exists. Please choose a different username or email.");
        }

        // Creating hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        if (newUser) {
            res.status(201).json({ _id: newUser.id, email: newUser.email });
        } else {
            throw new Error("Error creating user. Please check the provided data.");
        }
    } catch (error) {
        console.error("Error in registerUser:", error.message);

        const err = new Error("Invalid request. Please check the provided data.");
        err.status = 400;
        next(err);
        return;
    }
});


// @desc Login user
// @route POST /api/users/
// @access public
const loginUser = expressAsyncHandler (async (req, res, next)=>{
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            throw new Error("Invalid input. Please provide username, email, and password.");
        }

        const userAvailable = await User.findOne({ email, username });

        if (!userAvailable) {
            throw new Error("User not exists. Please choose a different username or email.");
        }

        // Compare password with hashed password
        if(bcrypt.compare(password, userAvailable.password)){
            // Payload for jwt token
            const payload = {
                user:{
                    username: userAvailable.username,
                    email: userAvailable.email,
                    id: userAvailable.id,
                },
            }

            const accessToken = Jwt.sign(payload,process.env.JWT_TOKEN,{ expiresIn: "40m" });
            res.status(200).json({ accessToken });
        }
        else{
            res.status(401);
            throw new Error("Email or password is not valid");
        }
    } catch (error) {
        console.error("Error in registerUser:", error.message);

        const err = new Error("Invalid request. Please check the provided data.");
        err.status = 400;
        next(err);
        return;
    }
});

// @desc current user information 
// @route GET /api/users/
// @access private
const currentUser = expressAsyncHandler (async (req, res)=>{
    res.json({message: "Current user information"});
});


export { registerUser, loginUser, currentUser };