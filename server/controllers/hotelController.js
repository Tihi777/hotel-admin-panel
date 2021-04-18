import ash from 'express-async-handler';
import Hotel from '../models/hotelModel.js';
import { deleteRooms } from './roomController.js';

export const getHotels = ash(async (req, res) => {
  const hotels = await Hotel.find().populate('rooms');

  res.status(200).json(hotels);
});

export const createHotel = ash(async (req, res) => {
  const hotel = new Hotel(req.body);

  const createdEmployeePosition = await hotel.save();

  res.status(201).json(createdEmployeePosition);
});

export const updateHotel = ash(async (req, res) => {
  const { name, address, description, image, score } = req.body;

  const hotel = await Hotel.findById(req.params.id);

  if (hotel) {
    hotel.name = name;
    hotel.address = address;
    hotel.description = description;
    hotel.image = image;
    hotel.score = score;

    const updatedHotel = await hotel.save();
    res.json(updatedHotel);
  } else {
    res.status(404);
    throw new Error("Hotel not found");
  }
});

export const addRoom = ash(async (roomId, hotelId) => {
  const hotel = await Hotel.findById(hotelId);

  if (hotel) {
    hotel.rooms.push(roomId);

    hotel.save().then(result => {
      Hotel.populate(hotel, { path: 'rooms' }).then(hotel => {
        return hotel;
      })
    });

  } else {
    throw new Error("Hotel not found");
  }
});

export const removeRoomFromHotel = ash(async (roomId, hotelId) => {
  const hotel = await Hotel.findById(hotelId);

  if (hotel) {
    hotel.rooms = hotel.rooms.filter(id => id !== roomId);

    hotel.save().then(result => {
      Hotel.populate(hotel, { path: 'rooms' }).then(hotel => {
        return hotel;
      })
    });

  } else {
    throw new Error("Hotel not found");
  }
})

export const deleteHotel = ash(async (req, res) => {
  const hotel = await Hotel.findById(req.params.id);

  if (hotel) {
    await deleteRooms(hotel._doc.rooms);
    await hotel.remove();

    res.json({ message: "Hotel removed" });
  } else {
    res.status(404);
    throw new Error("Hotel not found");
  }
});
