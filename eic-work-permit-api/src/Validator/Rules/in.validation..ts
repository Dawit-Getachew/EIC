import { Model, Document } from "mongoose";
import { CheckDataExist } from "./check_data_exist.common";

export class InValidation {
  public static async idDataUnique(tagName: string, tagValue: any, model: Model<Document>) {
    return await CheckDataExist.dataExist(tagName, tagValue, model);
  }
}