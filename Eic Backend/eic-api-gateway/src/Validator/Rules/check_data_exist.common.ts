import { Model, Document } from "mongoose";

export class CheckDataExist {
  public static async dataExist(tagName: string, tagValue: any, model: Model<Document>): Promise<boolean> {
    try {
      return await model.exists({ [tagName]: tagValue });
    } catch (error) {
      throw new Error(`\n\n${error} \n\n`);
    }
  }
}