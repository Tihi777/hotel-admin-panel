import ash from "express-async-handler";
import Hotel from "../models/hotelModel.js";

export const getHotels = ash(async (req, res) => {
  const hotels = await Hotel.find();

  res.status(200).json(hotels);
});

export const createHotel = ash(async (req, res) => {
  const hotel = new Hotel(req.body);

  const createdEmployeePosition = await hotel.save();

  res.status(201).json(createdEmployeePosition);
});

export const updateHotel = ash(async (req, res) => {
  const { name, address, description, image } = req.body;

  const hotel = await Hotel.findById(req.params.id);

  if (hotel) {
    hotel.name = name;
    hotel.address = address;
    hotel.description = description;
    hotel.image = image;

    const updatedHotel = await hotel.save();
    res.json(updatedHotel);
  } else {
    res.status(404);
    throw new Error("Hotel position not found");
  }
});

export const deleteHotel = ash(async (req, res) => {
  const hotel = await Hotel.findById(req.params.id);

  if (hotel) {
    await hotel.remove();
    res.json({ message: "Hotel removed" });
  } else {
    res.status(404);
    throw new Error("Hotel not found");
  }
});
