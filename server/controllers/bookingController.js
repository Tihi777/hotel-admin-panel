import ash from "express-async-handler";
import Booking from "../models/bookingModel.js";

export const getBookings = ash(async (req, res) => {
  const bookings = await Booking.find()
    .populate("guest")
    .populate("hotel")
    .populate("room")
    .populate({
      path: "room",
      populate: {
        path: "roomType",
        model: "RoomType",
      },
    });

  res.status(200).json(bookings);
});

export const createBooking = ash(async (req, res) => {
  const booking = new Booking(req.body);

  const createdBooking = await booking.save();

  await Booking.populate(createdBooking, "guest");
  await Booking.populate(createdBooking, "hotel");
  const populatedBooking = await Booking.populate(createdBooking, {
    path: "room",
    populate: {
      path: "roomType",
      model: "RoomType",
    },
  });

  console.log(populatedBooking);

  res.status(201).json(populatedBooking);
});

export const updateBooking = ash(async (req, res) => {
  const { arrivalDate, departureDate, guest, hotel, room, services } = req.body;

  const booking = await Booking.findById(req.params.id);

  if (booking) {
    booking.arrivalDate = arrivalDate;
    booking.departureDate = departureDate;
    booking.guest = guest;
    booking.hotel = hotel;
    booking.room = room;
    booking.services = services;

    const savedBooking = await booking.save();

    await Booking.populate(savedBooking, "guest");
    await Booking.populate(savedBooking, "hotel");
    const populatedBooking = await Booking.populate(savedBooking, {
      path: "room",
      populate: {
        path: "roomType",
        model: "RoomType",
      },
    });

    res.json(populatedBooking);
  } else {
    res.status(404);
    throw new Error("Booking not found");
  }
});

export const deleteBooking = ash(async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (booking) {
    await booking.remove();
    res.json({ message: "Bookings removed" });
  } else {
    res.status(404);
    throw new Error("Bookings not found");
  }
});
