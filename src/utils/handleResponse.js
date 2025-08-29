export const handleResponse = (res, success, statusCode, message, data = null, error = null) => {
    return res.status(statusCode).json({
        success,
        statusCode,
        message,
        ...(data && { data }),
        ...(error && { error })
    })
}