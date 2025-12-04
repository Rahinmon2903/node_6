import booking from "../Model/bookingSchema.js";
import sendEmail from "../Utils/mailer.js";

export const bookingservice = async (req, res) => {
  try {
    const { service, date } = req.body;

    // create booking
    const newBooking = new booking({
      user: req.user._id,
      service,
      date
    });

    await newBooking.save();

    // send email
    await sendEmail(
      req.user.email,
      "Service Booking Confirmed",
      `Your service ID: ${service} has been booked for ${date}`
    );

    res.status(200).send({
      message: "Booked successfully",
      data: newBooking
    });

  } catch (error) {
    res.status(503).send({
      message: "Error in booking service",
      error: error.message
    });
  }
};
