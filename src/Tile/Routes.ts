import Router from "express";

import TileController from "./Controller";

const TilesRoutes = Router();
const controller = new TileController();

TilesRoutes.get("/tiles", async (request, response) => {
  function boolearize(value: string | undefined): boolean {
    return value === "true";
  }
  try {
    const { onlyIds } = request.query as { onlyIds: string };

    const body = await controller.getAll({ onlyIds: boolearize(onlyIds) });
    return response.status(200).json(body);
  } catch (e) {
    return response.status(400).json({ message: "erro ao obter tiles" });
  }
});

export default TilesRoutes;
