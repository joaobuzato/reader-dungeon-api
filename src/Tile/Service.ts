import TileRepository from "./Repository";

export default class TileService {
  repository: TileRepository;
  constructor(repository: TileRepository) {
    this.repository = repository;
  }
  async getAll() {
    return await this.repository.getAll();
  }
}
