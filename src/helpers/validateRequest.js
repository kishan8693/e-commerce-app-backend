import { StatusCodes } from "http-status-codes";
import { handleResponse } from "../utils/handleResponse.js";

export const validator = {
    body: (schema) => {
        return (req, res, next) => {
            const { error } = schema.validate(req.body, {
                abortEarly: false,
                stripUnknown: true,
            });

            if (error) {
                return handleResponse(
                    res,
                    false,
                    StatusCodes.BAD_REQUEST,
                    "Validation failed",
                    null,
                    error.details.map((err) => err.message)
                );
            }

            next();
        };
    },

    params: (schema) => {
        return (req, res, next) => {
            const { error } = schema.validate(req.params, {
                abortEarly: false,
                stripUnknown: true,
            });

            if (error) {
                return handleResponse(
                    res,
                    false,
                    StatusCodes.BAD_REQUEST,
                    "Validation failed",
                    null,
                    error.details.map((err) => err.message)
                );
            }

            next();
        };
    }
};
