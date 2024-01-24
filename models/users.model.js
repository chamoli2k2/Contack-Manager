import Mongoose from "mongoose";

const userSchema = Mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please add the user name"],
            unique: [true, "User name should be unique"]
        },

        email: {
            type: String,
            required: [true, "Please add the user name"],
            unique: [true, "Email address already taken"]
        },

        password: {
            type: String,
            required: [true, "Please add the user password"],
        },
    },

    {
        timestamps: true,
    }
);

export const User = Mongoose.model("User",userSchema);