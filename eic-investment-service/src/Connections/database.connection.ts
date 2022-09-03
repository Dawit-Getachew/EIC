import mongoose from "mongoose";
import { database } from "../Config/database.config";
import { Print } from "../Helpers/Print";

export class Database {
    private _databaseName: String | undefined;
    private _databaseHost: String  | undefined;
    private _databasePort: String | undefined;

    // initialize database url and database name.
    constructor() {
        this._databaseHost = database.databaseHost;
        this._databaseName = process.env.NODE_ENV === "test"? `${database.databaseName}-test` :  database.databaseName;
        this._databasePort = database.databasePort;
    }

    // get full url of database connection by concatinating the database url and database name. 
    private getFullUrl(): string {
        return String(process.env.DEPLOYED) === "true"?
        `mongodb+srv://yab:Lumberjack_6969@test-y8c98.mongodb.net/${process.env.DATABASE_NAME}?authSource=admin&replicaSet=test-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true`
        :`mongodb://${this._databaseHost}:${this._databasePort}/${this._databaseName}`;
    }

    // create database connection. 
    public connect() {
        mongoose.connect(
            this.getFullUrl(),
            (error: any) => {
                if (!error) {
                    Print.active(("success: database conneted successfully."));
                } else {
                    Print.error("error: database connection failed.")
                    throw Error(error);
                }
            }
        )
    }

    public disconnect() {
        mongoose.disconnect()
    }
}


