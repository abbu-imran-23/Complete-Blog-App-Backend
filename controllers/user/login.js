// Import Models
const { User } = require('../../models/Models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let gmailValidator = require("google-gmail-validator");

const login = async(request,response) => {
    try {
        // Parse login credentials from request body
        const { email, password } = request.body;

        // Handle if any field is not entered by the user
        if(!email || !password) {
            return response.status(401).json({
                success: false,
                message: "Please enter all the fields"
            })
        }

        // Validate gmail
        if (await !gmailValidator.validateGmail(email)) {
            return response.status(401).json({
                success: false,
                message: "Please enter a valid gmail"
            })
        }

        // Check if user is already registered
        const isUserExist = await User.findOne({email: email});

        if(!isUserExist) {
            return response.status(404).json({
                success: false,
                message: "User not registered"
            })
        }

        // Validate Password
        if(await bcrypt.compare(password, isUserExist.password)) {

            // Payload for JWT 
            const jwtPayload = {
                id: isUserExist.id,
                name: isUserExist.name,
                email: isUserExist.email,
            }

            // JWT Secret Key
            require('dotenv').config();
            const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

            // JSON Web Token
            const token = jwt.sign(jwtPayload, JWT_SECRET_KEY, {
                expiresIn: "2h"
            })

            const user = isUserExist.toObject();
            user.token = token;
            user.password = undefined;

            // Options for cookie
            const options = {
                expires: new Date(Date.now() + 15000),
                httpOnly: true
            }

            // Send token in cookie
            return response.cookie("token", token, options).status(200).json({
                success: true,
                token: token,
                user: user,
                message: "Login Successful"
            })

        }

        // Incorrect Password
        response.status(401).json({
            success: false,
            message: "Incorrect password"
        })

    } catch (error) {
        // Send failure flag
        response.status(500).json({
            success: false,
            error: error,
            message: "Internal Server Error"
        })
    }
}

module.exports = login;