import ash from "express-async-handler";
import Guest from "../models/guestModel.js";

export const getGuests = ash(async (req, res) => {
  const guests = await Guest.find();

  res.status(200).json(guests);
});

export const createGuest = ash(async (req, res) => {
  const guest = new Guest(req.body);

  const createdGuest = await guest.save();

  res.status(201).json(createdGuest);
});

export const updateGuest = ash(async (req, res) => {
  const { name, email, status } = req.body;

  const guest = await Guest.findById(req.params.id);

  if (guest) {
    guest.name = name;
    guest.email = email;
    guest.status = status;

    const savedGuest = await guest.save();

    res.json(savedGuest);
  } else {
    res.status(404);
    throw new Error("Guest not found");
  }
});

export const deleteGuest = ash(async (req, res) => {
  const guest = await Guest.findById(req.params.id);

  if (guest) {
    await guest.remove();
    res.json({ message: "Guests removed" });
  } else {
    res.status(404);
    throw new Error("Guests not found");
  }
});
