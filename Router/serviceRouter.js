import express from "express";
import {
    createService,
    getAllService,

    updateService,
    deleteService
} from "../Controller/serviceController.js";
import { adminMiddleware } from "../Middleware/adminMiddleware.js";

const router = express.Router();

// Create service
router.post("/create", adminMiddleware, createService);

// Get all services
router.get("/all", getAllService);


// Update service by ID
router.put("/:id", adminMiddleware, updateService);

// Delete service by ID
router.delete("/:id", adminMiddleware, deleteService);

export default router;
