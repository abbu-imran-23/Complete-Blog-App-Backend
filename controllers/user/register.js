// Import Models
const { User } = require('../../models/Models');
const bcrypt = require('bcrypt');
let gmailValidator = require("google-gmail-validator");

const register = async(request,response) => {
    try {
        // Parse user details from request body
        const {name, email, password, about} = request.body;

        // Handle if any field is not entered by the user
        if(!name || !email || !password || !about) {
            return response.status(401).json({
                success: false,
                message: "Please enter all the fields"
            })
        }

        // Validate Email
        if(await !gmailValidator.validateGmail(email)) {
            return response.status(401).json({
                success: false,
                message: "Please enter a valid email"
            })
        }

        // Handle if the user is already registered
        const alreadyExist = await User.findOne({email: email});
        if(alreadyExist) {
            return response.status(403).json({
                success: false,
                message: "User already exist, Please sign in with different email id"
            })
        }

        try {
            // Password Hashing
            const hashedPassword = (await bcrypt.hash(password, 10)).toString();
            // Enter in to the database
            const dbResponse  = await User.create({
                name: name,
                email: email,
                password: hashedPassword,
                about: about
            })

            // Mask Password
            dbResponse.password = undefined;

            // Send Success flag
            response.status(200).json({
                success: true,
                data: dbResponse,
                message: "User Registered Successfully"
            })

        } catch (error) {
            // Send failure flag
            response.status(500).json({
            success: false,
            error: error,
            message: "Something went wrong, please try again later"
            })
        }

    } catch (error) {
        // Send failure flag
        response.status(500).json({
            success: false,
            error: error,
            message: "Internal Server Error"
        })
    }
}

module.exports = register;