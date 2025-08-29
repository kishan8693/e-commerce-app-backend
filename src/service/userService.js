import User from "../models/userModel.js"

export const findUserService = async (query) => {
    try {
        return await User.findOne(query)
    } catch (error) {
        throw error;
    }
}

export const createUserService = async (data) => {
    try {
        return await User.create(data)
    } catch (error) {
        throw error
    }
}

export const updateProfileService = async (query, data = {}) => {
    try {
        const updateData = User.findOneAndUpdate(
            query,
            { $set: data },
        )
        return updateData
    } catch (error) {
        throw error
    }
}