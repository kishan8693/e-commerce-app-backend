import Joi from "joi";

export const registerValidation = Joi.object({
    userName: Joi.string().min(3).max(30).required(),

    email: Joi.string().email().required(),

    phone_number: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .required()
        .messages({
            "string.pattern.base": "Phone number must be 10 digits",
        }),

    password: Joi.string().min(6).required(),

    confirm_password: Joi.any()
        .valid(Joi.ref("password"))
        .required()
        .messages({ "any.only": "Passwords do not match" }),

    role: Joi.string().valid("admin", "seller", "customer").default("customer"),
});
