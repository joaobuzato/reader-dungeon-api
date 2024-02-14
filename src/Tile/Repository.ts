import Database from "../Infra/Database";
import { Tile } from "./Tile";

export default class TileRepository {
  database: Database;
  constructor(database: Database) {
    this.database = database;
  }

  async getAll(): Promise<Tile[]> {
    return [
      {
        title: "Título do Tile",
        text: "Texto do Tile, exibido na tela para o usuário",
        treasures: 2,
        actions: [{ name: "money", quantity: 3 }],
      },
    ];
  }
}
