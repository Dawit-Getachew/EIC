import { Model, Document } from "mongoose";
import { Helper } from "../Helpers/helper";
import { ErrorMessage } from "../Helpers/error_message";
import { CheckDataExist } from "./check_data_exist.common";

export class ExistValidation {
  private static failed: boolean;

  public static getIsFailed() {
    return ExistValidation.failed;
  }

  public static validate(ruleName: string, tagValue: any, model: Model<Document>) {
    const tagName = Helper.getTagName(ruleName);
    return ExistValidation.run(tagName, tagValue, model);
  }

  private static async run(tagName: string, tagValue: any, model: Model<Document>) {
    if (await CheckDataExist.dataExist(tagName, tagValue, model)) {
      return true;
    }
    ExistValidation.failed = true;
    return false;
  }

  public static getErrorMessage(fieldName: string) {
    return ExistValidation.failed ? ErrorMessage.exist(fieldName) : null;
  }

}