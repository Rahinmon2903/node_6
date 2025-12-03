import dotenv from "dotenv";
import user from "../Model/userSchema";
import jwt from "jsonwebtoken";

dotenv.config();

export const adminMiddleware = async (req, res, next) => {

    // 1st method:
    // The client sends a token in the "Authorization" header.
    // Here we read the entire value of that header (token or "Bearer <token>").
    const token = req.header("Authorization");

    // 2nd method (recommended when using "Bearer <token>" format)
    // const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(404).json({ message: "Token missing" });
    }

    try {
        // Verify the token using the secret key.
        // If valid, this returns the payload stored inside the token (including _id).
        const tokendecode = jwt.verify(token, process.env.SECERT_KEY);

        // Using the _id from the decoded token, find the user in the database.
        // .select("-password") removes the password field from the result.
        req.user = await user.findById(tokendecode._id).select("-password");

        // Move to the next middleware or route handler if the role is admin.
        if(req.user.role == "admin"){
            next();
        }else{
            return res.status(403).json({ message: "access denied" });

        }

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};







//this function is correct is we add role while sign
// export const adminMiddleware = async (req, res, next) => {

//     // 1st method:
//     // The client sends a token in the "Authorization" header.
//     // Here we read the entire value of that header (token or "Bearer <token>").
//     const token = req.header("Authorization");

//     // 2nd method (recommended when using "Bearer <token>" format)
//     // const token = req.headers.authorization?.split(" ")[1];

//     if (!token) {
//         return res.status(404).json({ message: "Token missing" });
//     }

//     try {
//         // Verify the token using the secret key.
//         // If valid, this returns the payload stored inside the token (including _id).
//         const tokendecode = jwt.verify(token, process.env.SECERT_KEY);

      
//         req.user = tokendecode;

//         if( req.user.role == "admin"){
//              next();

//         }else{
//              return res.status(403).json({ message: "access denied" });

//         }

      
       

//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };
