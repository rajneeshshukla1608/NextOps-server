import { model } from "mongoose";
import { User } from "../models/user.js";
import bcrypt from "bcrypt"
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middleware/error.js";


export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email }).select("+password");
        if (!user) return next(new ErrorHandler("Invalid Email or password", 400))

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(404).json({
                success: false,
                message: "Match not found"
            });
        }
        sendCookie(user, res, `Welcome back ${user.first_name}`, 200);
    } catch (error) {
        next(error)
    }
}


export const signup = async (req, res, next) => {

   try {
    const { first_name, last_name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return next(new ErrorHandler("User already exists", 400))

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
        first_name,
        last_name,
        email,
        password: hashedPassword
    });

    sendCookie(user, res, "Registered Successfully", 201);
   } catch (error) {
    next(error)
   }
};

export const getMyProfile = (req, res) => {

    res.status(200).json({
        success: true,
        user: req.user
    })

};

export const logout = async (req, res, next) => {
    try {
        res.status(200)
            .cookie("token", "", {
                expires: new Date(Date.now()),
                sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
                secure: process.env.NODE_ENV === "Development" ? false : true,
                httpOnly: true
            })
            .json({
                success: true,
                message: "Logged Out Successfully"
            });
    } catch (error) {
        next(error);
    }
};

export const updatePassword = async (req, res, next) => {
    try {
        const { oldPassword, newPassword } = req.body;
        
        const user = await User.findById(req.user._id).select("+password");
        
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        
        if (!isMatch) {
            return next(new ErrorHandler("Invalid Old Password", 400));
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        
        await user.save();

        res.status(200).json({
            success: true,
            message: "Password Updated Successfully"
        });
    } catch (error) {
        next(error);
    }
};
















// import { prismaClient } from "../server.js";
// import { hashSync } from "bcrypt";
// import jwt  from "jsonwebtoken";

// export const signup = async (req, res) => {
//   const {name, email, password} = req.body;

//   const existingUser = await prismaClient.user.findUnique({
//     where: { email: req.body.email },
//   });

//   if (existingUser) return res.status(409).json({ message: "User already exists" });
  
//   const newUser = await prismaClient.user.create({
//     data: {
//       name: name,
//       email: email,
//       password: hashSync(password, 10),
//       role: "USER",
//       provider: "Google",
//     },
//   });

//   res.json({ message: "User profile created", success: true });
// };

// export const login = async (req, res) => {
  
//   try {
//     const user = await prismaClient.user.find({ email: req.body.email });

//     if (!user) return res.status(404).json({ message: "User not found" });

//     if (user.provider!== "Google")
//       return res.status(403).json({ message: "Invalid provider" });
//     const token = jwt.sign(
//       { userId: user.id, email: user.email },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );
//     res.cookie("token", token, { httpOnly: true, maxAge: 86400000 });
//     res.json({ message: "Logged in successfully", success: true });

//     const validPassword = await bcrypt.compare(
//       req.body.password,
//       user.password
//     );
//     if (!validPassword)
//       return res.status(401).json({ message: "Invalid password" });
//     res.json({ message: "Logged in successfully", success: true });
//   } catch (error) {                                  
//     logger.error(error);
//   }
// };

