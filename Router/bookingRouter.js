import express from "express";
import { bookingservice } from "../Controller/bookingController.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";




const router=express.Router();

router.post("/booking",authMiddleware,bookingservice)







export default router;