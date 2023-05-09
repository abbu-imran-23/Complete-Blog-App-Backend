const jwt = require('jsonwebtoken');

// Get JWT Secret Key
require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const auth = (request,response,next) => {
    try {
        // Parse Token from header or cookie or body
        // request.header("Authorization").replace("Bearer ", "") || request.cookie.token ||
        const token = request.cookies.token || request.body.token || request.header("Authorization").replace("Bearer ", "");
        // Handle if there is no token
        if(!token) {
            return response.status(401).json({
                success: false,
                message: "Token is missing"
            })
        }
        // Verify Token
        try {
            const payload = jwt.verify(token, JWT_SECRET_KEY);
            if(!payload) {
                return response.status(401).json({
                    success: false,
                    message: "Payload is Empty"
                    })
                }
            request.user = payload;
        } catch (error) {
            response.status(401).json({
                success: false,
                message: "Token is invalid"
            })
        }

        // Call the next middleware
        next();

    } catch (error) {
        // send failure flag
        response.status(401).json({
            success: false,
            message: "something went wrong while verifying token"
        })
    }
}

module.exports = auth;