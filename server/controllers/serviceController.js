import ash from "express-async-handler";
import Service from "../models/serviceModel.js";

export const getServices = ash(async (req, res) => {
  const services = await Service.find();

  res.status(200).json(services);
});

export const createService = ash(async (req, res) => {
  const service = new Service(req.body);

  const createdService = await service.save();

  res.status(201).json(createdService);
});

export const updateService = ash(async (req, res) => {
  const { name, cost, description } = req.body;

  const service = await Service.findById(req.params.id);

  if (service) {
    service.name = name;
    service.cost = cost;
    service.description = description;

    const savedService = await service.save();

    res.json(savedService);
  } else {
    res.status(404);
    throw new Error("Service not found");
  }
});

export const deleteService = ash(async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (service) {
    await service.remove();
    res.json({ message: "Services removed" });
  } else {
    res.status(404);
    throw new Error("Services not found");
  }
});
