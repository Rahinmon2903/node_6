import service from "../Model/serviceSchema.js";

// Create service
export const createService = async (req, res) => {
    try {
        const newService = new service(req.body);
        await newService.save();
        res.status(200).json({ message: "Service created successfully", data: newService });

    } catch (error) {
        res.status(503).json({ message: "Error in creating service", error: error.message });
    }
};

// Get all services
export const getAllService = async (req, res) => {
    try {
        const allServices = await service.find();
        res.status(200).json({ message: "Data retrieved successfully", data: allServices });

    } catch (error) {
        res.status(503).json({ message: "Error in getting all services", error: error.message });
    }
};

//update
export const updateService = async (req, res) => {
    try {
        const serviceId = req.params.id;

        // Destructure only fields from your schema
        const { name, description, price } = req.body;

        const result = await service.findByIdAndUpdate(
            serviceId,
            { name, description, price },
            { new: true }
        );

        if (!result) {
            return res.status(404).json({ message: "No service found" });
        }

        return res.status(200).json({
            message: "Service updated successfully",
            data: result
        });

    } catch (error) {
        res.status(503).json({
            message: "Error in updating service",
            error: error.message
        });
    }
};


// Delete service by ID
export const deleteService = async (req, res) => {
    try {
        const serviceId = req.params.id;

        const result = await service.findByIdAndDelete(serviceId);

        if (!result) {
            return res.status(404).json({ message: "No service found" });
        }

        return res
            .status(200)
            .json({ message: "Service deleted successfully", data: result });

    } catch (error) {
        return res.status(503).json({ message: "Error in deleting service", error: error.message });
    }
};
