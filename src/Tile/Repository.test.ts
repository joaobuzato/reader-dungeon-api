import { describe, expect, test } from "@jest/globals";
import Database from "../Infra/Database";
import TileRepository from "./Repository";
import { mock } from "jest-mock-extended";

import ActionRepository from "../Action/Repository";

describe("RoomRepository", () => {
  const getAllByTileIdSpy = jest.spyOn(
    ActionRepository.prototype,
    "getAllByTileId"
  );
  describe("getAll", () => {
    const expectedReturn = [
      {
        id: 1,
        title: "Primeiríssimo Tile Criado",
        text: "Este é o primeiro tile criado na reader dungeon.",
        treasures: 3,
      },
    ];

    const databaseMock = mock<Database>();
    const repository = new TileRepository(databaseMock);

    beforeEach(() => {
      databaseMock.query.mockClear();
      databaseMock.insertQuery.mockClear();
      getAllByTileIdSpy.mockClear();
    });
    test("should getAll correctly", async () => {
      databaseMock.query.mockResolvedValue(expectedReturn);

      const result = await repository.getAll();

      expect(result).toEqual(expectedReturn);
      expect(databaseMock.query).toHaveBeenCalledWith(
        "SELECT * FROM reader_dungeon.Tile"
      );
      expect(getAllByTileIdSpy).toHaveBeenCalledWith(1);
    });
    test("should reject if promise is rejected", async () => {
      databaseMock.query.mockRejectedValue([]);

      await expect(repository.getAll()).rejects.toStrictEqual([]);
      expect(databaseMock.query).toHaveBeenCalledWith(
        "SELECT * FROM reader_dungeon.Tile"
      );
    });
  });
});
