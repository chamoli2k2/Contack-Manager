// These are the controllers
import expressAsyncHandler from "express-async-handler";
import { Contact }  from "../models/contacts.model.js";

// @desc GET contact
// @route GET /api/contacts/
// @access private
const getContacts = expressAsyncHandler (async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id });
    res.status(200).json(contacts);
});

// @desc create contact
// @route POST /api/contacts/
// @access private
const createContact = expressAsyncHandler (async (req, res, next) => {
    console.log("The req body is\n",req.body);
    const { name, email, phone } = req.body;
    
    if(!name || !email || !phone){
        const error = new Error("All fields are mandatory");
        error.status = 400;  // Set the status property of the error object
        next(error);  // Pass the error to the next middleware (errorHandler)
        return;  // Ensure that the function stops execution here
    }

    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id,
    });

    res.status(201).json(contact);
});

// @desc update contact
// @route PUT /api/contacts/:id
// @access private
const updateContact = expressAsyncHandler (async (req, res, next) => {
        try {
            const findcontact = await Contact.findById(req.params.id);
    
            if (!findcontact) {
                throw new Error("Contact not found Hello");
            }

            if(findcontact.user_id.toString() !== req.user.id){
                res.status(403);
                throw new Error("User don't have permission to update the contact");
            }

            findcontact.set(req.body);
            const newContact = await findcontact.save();
    
            res.status(200).json(newContact);
            
        } catch (error) {
            console.log("Error message:", error.message); // Access the error message
            const err = new Error("Contact not found")
            err.status = 404;
            next(err);
            return;
        }
});

// @desc get a contact
// @route GET /api/contacts/:id
// @access private
const getAContact = expressAsyncHandler (async (req, res, next) => {
    try {
        const findcontact = await Contact.findById(req.params.id);

        if (!findcontact) {
            throw new Error("Contact not found");
        }

        res.status(200).json(findcontact);
    } catch (error) {
        console.log("Error message:", error.message); // Access the error message
        const err = new Error("Contact not found")
        err.status = 404;
        next(err);
        return;
    }
});

// @desc delete contact
// @route DELETE /api/contacts/:id
// @access private
const deleteContact = expressAsyncHandler (async (req, res, next) => {
    const contact = await Contact.findById(req.params.id);

    if(!contact){
        res.status(404);
        const err = new Error("Contact not found");
        err.status = 404;
        next(err);
        return;
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have permission to delete the contact");
    }

    // Use deleteOne() method
    await Contact.deleteOne({ _id: req.params.id });
    
    res.status(200).json(contact);
});


export { getContacts, createContact, updateContact, getAContact, deleteContact };