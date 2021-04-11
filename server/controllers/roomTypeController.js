import ash from "express-async-handler";
import RoomType from "../models/roomTypeModel.js";

export const getRoomTypes = ash(async (req, res) => {
  const roomTypes = await RoomType.find();

  res.status(200).json(roomTypes);
});

export const createRoomType = ash(async (req, res) => {
  const roomType = new RoomType(req.body);

  const createdRoomType = await roomType.save();

  res.status(201).json(createdRoomType);
});

export const updateRoomType = ash(async (req, res) => {
  const { numberOfRooms, numberOfBeds, cost, name, description } = req.body;

  const roomType = await RoomType.findById(req.params.id);

  if (roomType) {
    roomType.numberOfRooms = numberOfRooms;
    roomType.numberOfBeds = numberOfBeds;
    roomType.cost = cost;
    roomType.name = name;
    roomType.description = description;

    const updatedRoomType = await roomType.save();
    res.json(updatedRoomType);
  } else {
    res.status(404);
    throw new Error("RoomType not found");
  }
});

export const deleteRoomType = ash(async (req, res) => {
  const roomType = await RoomType.findById(req.params.id);

  if (roomType) {
    await roomType.remove();
    res.json({ message: "RoomType removed" });
  } else {
    res.status(404);
    throw new Error("RoomType not found");
  }
});
