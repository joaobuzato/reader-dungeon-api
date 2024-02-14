import Database from "../Infra/Database";
import TileRepository from "./Repository";
import TileService from "./Service";

export default class TileController {
  service: TileService;
  constructor() {
    const database = new Database();
    const repository = new TileRepository(database);
    this.service = new TileService(repository);
  }
  async getAll() {
    return await this.service.getAll();
  }
}
