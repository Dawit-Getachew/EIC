import { Model, Document } from "mongoose";
import { Helper } from "../Helpers/helper";
import { ErrorMessage } from "../Helpers/error_message";
import { CheckDataExist } from "./check_data_exist.common";

export class UniqueValidation {
  private static failed: boolean;

  public static getIsFailed() {
    return UniqueValidation.failed;
  }

  public static async validate(ruleName: string, tagValue: any, model: Model<Document>) {
    const tagName = Helper.getTagName(ruleName);
    return await UniqueValidation.run(tagName, tagValue, model);
  }

  private static async run(tagName: string, tagValue: any, model: Model<Document>) {
    if (!(await CheckDataExist.dataExist(tagName, tagValue, model))) {
      return true;
    }
    UniqueValidation.failed = true;
    return false;
  }

  public static getErrorMessage(fieldName: string) {
    return UniqueValidation.failed ? ErrorMessage.unique(fieldName) : null;
  }

}