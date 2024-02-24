import Database from "../Infra/Database";
import { Tile } from "./Tile";

import ActionRepository from "../Action/Repository";
export default class TileRepository {
  database: Database;
  constructor(database: Database) {
    this.database = database;
  }

  async getAll(): Promise<Tile[]> {
    const result = await this.database.query<Tile>(
      "SELECT * FROM reader_dungeon.Tile"
    );
    const actionsPromises = result.map(async (tile) => {
      const actions = await new ActionRepository(this.database).getAllByTileId(
        tile.id ?? 0
      );
      tile.actions = actions;
      return tile;
    });
    const tilesWithActions = await Promise.all(actionsPromises);

    console.log(tilesWithActions);

    return tilesWithActions;
  }
}
