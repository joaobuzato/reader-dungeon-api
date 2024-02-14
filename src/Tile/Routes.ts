import Router from "express";

import TileController from "./Controller";

const TilesRoutes = Router();
const controller = new TileController();

TilesRoutes.get("/tiles", async (request, response) => {
  try {
    const body = await controller.getAll();
    return response.status(200).json(body);
  } catch (e) {
    return response.status(400).json({ message: "erro ao obter tiles" });
  }
});

export default TilesRoutes;
