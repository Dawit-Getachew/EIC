import { Model, Document } from "mongoose";

export class CheckDataExist {
  public static async dataExist(
    tagName: string,
    tagValue: any,
    model: Model<Document>
  ): Promise<boolean> {
    try {
      const doc = await model.exists({ [tagName]: tagValue });
      if (doc !== null) {
        return false;
      }
      return true;
    } catch (error) {
      throw new Error(`\n\n${error} \n\n`);
    }
  }
}
