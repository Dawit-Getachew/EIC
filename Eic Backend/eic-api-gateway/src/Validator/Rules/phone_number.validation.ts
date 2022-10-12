import { ErrorMessage } from "../Helpers/error_message";
import { CountryCodeName, CountryCode, CountryPhoneNumberLength, CountryName } from "../Constants/enums";

export class PhoneNumberValidation {
  private static failed: boolean;
  private static countryName: string;

  public static getIsFailed() {
    return PhoneNumberValidation.failed;
  }

  /**
   * 1. normalize rule(make trim and lowerCase).
   * 2. get country code name from the rule
   * 3. validate the phone number.
   * 
   * 
   * @param ruleValue string
   * @param value string
   */
  public static validate(ruleValue: string, value: string) {
    ruleValue = PhoneNumberValidation.normalize(ruleValue);
    const countryCode = PhoneNumberValidation.getCountryCode(ruleValue);
    return PhoneNumberValidation.run(countryCode, value);
  }
  // regex for phone 
  private static run(countryCode: string, value: string) {
    switch (countryCode) {
      case CountryCodeName.ET:
        let pattern = /\+2519[0-9]{8}/;
        // if (!value.startsWith(CountryCode.ET) || (value.length != CountryPhoneNumberLength.ET) || Number.isNaN(Number(value.substring(1)))) {
        if (!pattern.test(value) || (value.length != CountryPhoneNumberLength.ET)) {
          PhoneNumberValidation.failed = true;
          PhoneNumberValidation.countryName = CountryName.ET;
          return false;
        }
        return true;
      default:
        throw new Error("\n\nerror country code name.\n\n");
    }
  }

  private static getCountryCode(ruleValue: string) {
    return ruleValue.split(":")[1].toLocaleLowerCase();
  }

  private static normalize(ruleValue: string) {
    ruleValue = ruleValue.trim().toLocaleLowerCase();
    return ruleValue;
  }

  public static getErrorMessage(fieldName: string) {
    return PhoneNumberValidation.failed ? ErrorMessage.phoneNumber(fieldName, PhoneNumberValidation.countryName) : null;
  }
}