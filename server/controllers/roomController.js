import ash from 'express-async-handler';
import Room from '../models/roomModel.js';
import { addRoom, removeRoomFromHotel } from './hotelController.js';

export const getRooms = ash(async (req, res) => {
  const rooms = await Room.find().populate("roomType");

  res.status(200).json(rooms);
});

export const createRoom = ash(async (req, res) => {
  const room = new Room(req.body);

  const createdRoom = await room.save();

  await addRoom(createdRoom._id, req.body.hotelId);

  const populatedRoom = await Room.findById(createdRoom._id).populate(
    "roomType"
  );

  res.status(201).json(populatedRoom);
});

export const updateRoom = ash(async (req, res) => {
  const { number, floor, status, roomType, hotelName, hotelId } = req.body;

  const room = await Room.findById(req.params.id);

  if (room) {
    room.number = number;
    room.floor = floor;
    room.status = status;
    room.roomType = roomType;
    room.hotelName = hotelName;
    room.hotelId = hotelId;

    room.save().then(() => {
      Room.populate(room, {path: 'roomType'}).then(room => {
        res.json(room)
      })
    });

  } else {
    res.status(404);
    throw new Error("Room not found");
  }

});

export const deleteRoom = ash(async (req, res) => {
  const room = await Room.findById(req.params.id);

  removeRoomFromHotel(req.params.id, room.hotelId);

  if (room) {
    await room.remove();
    res.json({ message: "Rooms removed" });
  } else {
    res.status(404);
    throw new Error("Rooms not found");
  }
});

export const deleteRooms = ash(async rooms => {
  rooms.map(async id => {
    const room = await Room.findById(id);

    if (room)
      await room.remove();
  })
});