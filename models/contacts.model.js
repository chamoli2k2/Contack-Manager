import Mongoose from "mongoose";

const contactSchema = Mongoose.Schema({
        user_id:{
            type: Mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        name: {
            type: String,
            required: [true, "Please add the contact name"],
        },

        email: {
            type: String,
            required: [true, "Please add the email address"],
        },

        phone: {
            type: String,
            required: [true, "Please add the phone number"],
        },
    }, 
    
    {
        timestamps: true
    }
);

export const Contact = Mongoose.model("Contact", contactSchema);