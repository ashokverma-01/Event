import Booking from '../models/bookingSchema.js';
import Event from '../models/userEvent.js'; 
import mongoose from 'mongoose';

// Create a new booking
export const createBooking = async (req, res) => {
  try {
    const { name, mobile, email, persons, eventId } = req.body;

    // Validate if the event exists
    const event = await Event.findById(eventId);
    if (!event) {
      console.log(`Event not found for ID: ${eventId}`);
      return res.status(404).json({ message: 'Event not found' });
    }

    const newBooking = new Booking({
      name,
      mobile,
      email,
      persons,
      eventId,
    });

    await newBooking.save();
    res.status(201).json({ message: 'Booking successful', booking: newBooking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('eventId', 'title')
      .sort({ bookedAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single booking by ID
export const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id).populate('eventId');
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a booking
export const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, mobile, email, persons, eventId } = req.body;

    // Validate if the event exists
    const isValidObjectId = mongoose.Types.ObjectId.isValid(eventId);
    if (!isValidObjectId) {
      return res.status(400).json({ message: 'Invalid eventId' });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { name, mobile, email, persons, eventId },
      { new: true, runValidators: true }
    ).populate('eventId');

    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a booking
export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBooking = await Booking.findByIdAndDelete(id);
    if (!deletedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
