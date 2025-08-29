import User from "../models/userModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { createUserService, findUserService, updateProfileService } from "../service/userService.js"
import { StatusCodes } from "http-status-codes"
import { handleResponse } from "../utils/handleResponse.js"
import mongoose from "mongoose"
dotenv.config({ quiet: true })
export const register = async (req, res) => {
    let { email } = req.body
    try {
        const userIsExist = await findUserService({ email })
        if (userIsExist) {
            return handleResponse(
                res,
                false,
                StatusCodes.CONFLICT,
                "User is already exist."
            )
        }
        const newUser = await createUserService(req.body)
        if (newUser) {
            return handleResponse(
                res,
                true,
                StatusCodes.CREATED,
                'New User Registration Successfully!!!!',
                newUser
            )
        }
    } catch (error) {
        return handleResponse(
            res,
            false,
            StatusCodes.INTERNAL_SERVER_ERROR,
            'failed to register',
            null,
            error.message
        )
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const isEmail = /\S+@\S+\.\S+/.test(email);

        const existingUser = await findUserService(isEmail ? { email } : { userName: email });
        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        const isMatch = await bcrypt.compare(password, existingUser.password)
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "invalid credential",
            });
        }
        const token = jwt.sign(
            { id: existingUser._id, role: existingUser.role },
            process.env.SECRET_KEY,
            { expiresIn: process.env.EXPIRE_IN }
        )
        return res.status(200).json({
            success: true,
            message: "login successfully!!",
            data: token
        })
    } catch (error) {
        console.log("from catch block", error)
        return res.status(500).json({
            success: false,
            message: "Failed to login"
        });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const userId = req.params
        const updatedData = req.body
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return handleResponse(
                res,
                false,
                StatusCodes.BAD_REQUEST,
                'invalid objectId.'
            )
        }
        const updateUser = await updateProfileService({ _id: userId }, updatedData)
        if (!updateUser) {
            return handleResponse(
                res,
                false,
                StatusCodes.NOT_FOUND,
                "user not found."
            )
        }
        return handleResponse(
            res,
            true,
            StatusCodes.OK,
            'Profile updated successfully!!!'
        )
    } catch (error) {
        return handleResponse(
            res,
            false,
            StatusCodes.INTERNAL_SERVER_ERROR,
            "failed to updated profile."
        )
    }
}