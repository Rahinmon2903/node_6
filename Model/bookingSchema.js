import mongoose from "mongoose";


const bookingSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },
    service:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"service",

        required:true,
        
    },
    date:{
        type:Date,
        required:true,
    }
   
})

const booking = mongoose.model("booking",bookingSchema);
export default booking;