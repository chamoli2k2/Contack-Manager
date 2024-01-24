import { Router } from "express";
import { getContacts, createContact, updateContact, getAContact, deleteContact} from "../controllers/contact.controller.js";
import validateToken from "../middleware/validateToken.middleware.js";

const router = Router();

router.use(validateToken);

router.route("/").get(getContacts);

router.route("/").post(createContact);

router.route("/:id").put(updateContact);

router.route("/:id").get(getAContact);

router.route("/:id").delete(deleteContact);

export default router;
