import user from "../Model/userSchema.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";


//register

export const userRegister=async (req,res) => {
    try {
        //1st method
        const {name,email,password}=req.body;
        const hashpassword=await bcrypt.hash(password,10) 
        const newUser=new user({name,email,password:hashpassword});
        await newUser.save();
         res.status(200).send({message:"user  registered successfully",data:newUser})

     


        
    } catch (error) {
        res.status(503).send({message:"user not registered error in user register"})
        
    }
    
}


//login

export const userLogin=async (req,res) => {
    try {
        
        const {email,password}=req.body;
        const matchemail=await user.findOne({email});
        if(!matchemail){
            return  res.status(404).send({message:"invalid email"})

        }
        const matchpassword=await bcrypt.compare(password,matchemail.password)
       if(!matchpassword){
        return  res.status(404).send({message:"invalid password"})

       }

       const token= jwt.sign({_id:matchemail._id},process.env.SECERT_KEY,{expiresIn:"1h"})
       matchemail.token=token;
       await matchemail.save();
         res.status(200).send({message:"user  logged in successfully",token:token})


        
    } catch (error) {
        res.status(503).send({message:"user not logged in error in user login"})
        
    }
    
}

//get all users

export const getUsers=async (req,res) => {
    try {
        
       const users=await user.find();
         res.status(200).send({message:"user data retireved successfully",data:users})


        
    } catch (error) {
        res.status(503).send({message:"user nfound error in get user"})
        
    }
    
}