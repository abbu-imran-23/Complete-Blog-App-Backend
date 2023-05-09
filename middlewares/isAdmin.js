const isAdmin = (request,response, next) => {
    try {
        // fetch email
        const email = request.user.email;
        
        // Authorize
        if(email === "imran@gmail.com" || email === "amarjeet@gmail.com") {
            return response.status(200).json({
                success: true,
                message: "Welcome admin bhai"
            })
        }
        
        // else {
            // If user is unauthorized
            response.status(401).json({
                success: false,
                message: "You are not allowed to this page because you are not an admin"
            })
        // }

        // call the next middleware
        next();

    } catch (error) {
        // send failure flag
        response.status(500).json({
            success: false,
            message: "User cannot be verified"
        })
    }
}

module.exports= isAdmin;