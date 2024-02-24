import * as fs from "fs";
import * as path from "path";
import Database from "./Infra/Database";

const directory = "./src/Infra/Scripts";

const database = new Database();
function migrate(file: string) {
  const data = fs.readFileSync(file, { encoding: "utf-8" });
  console.log(data);
  return database.migrate(data);
}
migrate("./src/Infra/Scripts/reader_dungeon.sql");
