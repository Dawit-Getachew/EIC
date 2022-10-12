import _ from "lodash";

export class NumberValidation {
  public static validateNumber(value: any) {
    // value = value ? value.trim() : value;
    return _.isNumber(value);
  }
}