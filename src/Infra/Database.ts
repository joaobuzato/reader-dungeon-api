import mysql, { Connection, OkPacket } from "mysql";
import dotenv from "dotenv";
import { Tile } from "../Tile/Tile";
dotenv.config();

export default class Database {
  connection: Connection;
  constructor() {
    this.connection = this.connect();
  }
  connect = () => {
    return mysql.createConnection({
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    });
  };

  query = async (
    query: string,
    options: Array<string | number> = []
  ): Promise<Tile[]> => {
    return new Promise((resolve, reject) => {
      this.connection.query(query, options, (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve(result);
      });
    });
  };
  insertQuery = async (
    query: string,
    options: Array<string | number> = []
  ): Promise<OkPacket> => {
    return new Promise((resolve, reject) => {
      this.connection.query(query, options, (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve(result);
      });
    });
  };
}
