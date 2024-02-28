import Database from "../Infra/Database";
import { Tile } from "./Tile";

import ActionRepository from "../Action/Repository";
export default class TileRepository {
  database: Database;
  constructor(database: Database) {
    this.database = database;
  }

  async getAll({ onlyIds = false }): Promise<Tile[]> {
    const query = onlyIds ? "id" : "*";
    const result = await this.database.query<Tile>(
      `SELECT ${query} FROM reader_dungeon.Tile`
    );
    if (onlyIds) {
      return result;
    }
    return await Promise.all(
      result.map(async (tile) => {
        return await this.populateActions(tile);
      })
    );
  }

  async populateActions(tile: Tile): Promise<Tile> {
    const actions = await new ActionRepository(this.database).getAllByTileId(
      tile.id ?? 0
    );
    tile.actions = actions;
    return tile;
  }
}
