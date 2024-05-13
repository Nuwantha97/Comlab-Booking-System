const router = require('express').Router();
const Booking = require("../models/Booking_model");

// Route to add a new booking
router.route("/add").post((req, res) => {
    // Extract data from the request body
    const { title, startTime, endTime, description, status, attendees } = req.body;

    // Create a new booking instance with the extracted data
    const newBooking = new Booking({
        title,
        startTime,
        endTime,
        description,
        status,
        attendees
    });

    // Save the new booking to the database
    newBooking.save().then(() => {
        res.json("Booking added successfully");
    }).catch((err) => {
        console.log(err); // Log any errors that occur during saving 
        res.status(500).json("Error adding booking");
    });
});

// Route to get info of all bookings
router.route("/").get((req, res) => {
    // Find all bookings in database
    Booking.find().then((bookings) => {
        res.json(bookings); // Respond with the list of bookings
    }).catch((err) => {
        console.log(err);
        res.status(500).json("Error fetching bookings");
    });
});

// Get info of a booking from database by id
router.route("/get/:id").get(async(req, res) => {
    const bookingId = req.params.id;
    const booking = await Booking.findById(bookingId).then((booking) => {
        if (!booking) {
            return res.status(404).json("Booking not found");
        }
        res.status(200).send({ status: "Booking fetched", booking: booking });
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error fetching booking", error: err });
    });
});

// Delete booking by id
router.route("/delete/:id").delete((req, res) => {
    const bookingId = req.params.id;
    Booking.findByIdAndDelete(bookingId).then(() => {
        res.status(200).json({ status: "Booking deleted" });
    }).catch((err) => {
        console.log(err);
        res.status(500).json("Error deleting booking");
    });
});

// Update booking by id
router.route("/update/:id").put((req, res) => {
    const bookingId = req.params.id;
    const { title, startTime, endTime, description, status, attendees } = req.body;
    const updateBooking = { title, startTime, endTime, description, status, attendees };
    Booking.findByIdAndUpdate(bookingId, updateBooking).then(() => {
        res.status(200).json({ status: "Booking updated" });
    }).catch((err) => {
        console.log(err);
        res.status(500).json("Error updating booking");
    });
});

module.exports = router;
