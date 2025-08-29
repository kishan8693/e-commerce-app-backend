import express from "express";
import { login, register } from "../../controller/userController.js";
import { registerValidation } from "../../validations/userValidation.js";
import { validator } from "../../helpers/validateRequest.js";


const router = express.Router()

router.post('/register', validator.body(registerValidation) ,register)
router.post('/login', login)

export default router