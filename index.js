import express from "express";
import dotenv from "dotenv";
import contactRoutes from "./routes/contact.route.js";
import errorHandler from "./middleware/errorHandler.middleware.js";
import connectDB from "./config/dbConnection.config.js";
import userRoutes from "./routes/user.route.js";

// configuring the dotenv
dotenv.config();

// Connecting the DB
connectDB();

// Making the express app
const app = express();

// Giving port
const port = process.env.PORT || 6969;

// This is built in middleware
app.use(express.json());
app.use('/api/contacts', contactRoutes);
app.use('/api/users', userRoutes);
app.use(errorHandler);

app.listen(port, ()=>{
    console.log(`Server running on port ${process.env.PORT}`);
});