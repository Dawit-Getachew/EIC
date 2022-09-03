// import { RadisConnection } from "./redis.connection";
import { DatabaseConnection } from "./database.connection";



export class Connect {
  /**
   * static database
   */
  public static database() {
    const database = new DatabaseConnection();
    database.connect();

  }

  /**
   * static redis
   */
  // public static async redis() {
  //   const redis = new RadisConnection();
  //   return await redis.connect();
  // }
}