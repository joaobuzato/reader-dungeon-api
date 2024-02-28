import TileRepository from "./Repository";

export default class TileService {
  repository: TileRepository;
  constructor(repository: TileRepository) {
    this.repository = repository;
  }
  async getAll({ onlyIds = false }) {
    return await this.repository.getAll({ onlyIds });
  }
}
