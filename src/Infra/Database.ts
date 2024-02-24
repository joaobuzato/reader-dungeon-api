import mysql, { OkPacket } from "mysql";
import dotenv from "dotenv";
dotenv.config();
import { Tile } from "../Tile/Tile";

export default class Database {
  connect = () => {
    return mysql.createConnection({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      multipleStatements: true,
    });
  };

  query = async <T>(
    query: string,
    options: Array<string | number> = []
  ): Promise<T[]> => {
    const connection = this.connect();
    return new Promise((resolve, reject) => {
      connection.query(query, options, (err, result) => {
        if (err) {
          connection.destroy();
          reject(err);
        }
        connection.destroy();
        resolve(result);
      });
    });
  };
  migrate = async (query: string) => {
    const connection = this.connect();
    return connection.query(query, (err, result) => {
      if (err) {
        console.error(err);
      }
      if (result) {
        console.log("Migration criada com sucesso!");
        connection.destroy();
      }
    });
  };
  insertQuery = async (
    query: string,
    options: Array<string | number> = []
  ): Promise<OkPacket> => {
    return new Promise((resolve, reject) => {
      this.connect().query(query, options, (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve(result);
      });
    });
  };
}
