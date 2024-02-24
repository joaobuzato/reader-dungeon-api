import mysql, { OkPacket } from "mysql";
import config from "../../config/index";

export default class Database {
  connect = () => {
    return mysql.createConnection(config.sqlConnection);
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
