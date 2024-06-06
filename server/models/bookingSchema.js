import mongoose from 'mongoose';


const bookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    mobile: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    persons: {
        type: String,
        required: true,
        trim: true,
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Event',
    },
    bookedAt: {
        type: Date,
        default: Date.now,
    },
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;