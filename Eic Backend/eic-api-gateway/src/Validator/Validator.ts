import { Model, Document } from "mongoose"
import _ from "lodash";
import { ErrorMessage } from "./Helpers/error_message";
import { EmailValidation } from "./Rules/email.validation";
import { ExistValidation } from "./Rules/exist.validation";
import { PhoneNumberValidation } from "./Rules/phone_number.validation";
import { RequiredValidation } from "./Rules/required.validation";
import { StringValidation } from "./Rules/string.validation";
import { UniqueValidation } from "./Rules/unique.validation";
import { IValidationErrors } from "./Constants/interface";

export class Validator {
    private errorBug: { [key: string]: { error_message: string, error_code: number }[] } = {};
    private validatedData: { [key: string]: any } = {};
    private rule?: { [key: string]: string[] }
    private data?: { [key: string]: any };
    private model: Model<Document> | null;

    public constructor(rules: { [key: string]: string }, data: { [key: string]: any }, model: Model<Document> | null = null) {
        this.rule = this.extractRule(rules);
        this.data = data;
        this.model = model;
    }

    public async validate() {
        for (let fieldName in this.rule) {
            for (let ruleName of this.rule[fieldName]) {
                await this.run(ruleName, fieldName, this.data![fieldName]);
            }
            if (!this.errorBug[fieldName]) {
                this.validatedData[fieldName] = this.data![fieldName];
            }
        }
        if (!_.isEmpty(this.errorBug))
            this.validatedData = {};
    }

    public fails() {
        return !_.isEmpty(this.errorBug);
    }

    public getErrorMessage() {
        let validationErrors: IValidationErrors = { __typename: "ValidationErrors", validation_errors: [] }
        // const errors = [];
        for (let key in this.errorBug) {
            validationErrors.validation_errors.push({ error_path: key, errors: this.errorBug[key] });
            // validationError.errors = this.errorBug[key];
            // validationError.error_path = key;
        }
        // console.log({ __typename: "ValidationError", errors: errors });
        return validationErrors;
    }

    public getValidData() {
        return this.validatedData
    }

    private extractRule(rules: { [key: string]: string }): { [key: string]: Array<string> } {
        const extractedRules: { [key: string]: Array<string> } = {};
        for (let key in rules) {
            extractedRules[key] = this.getRule(rules[key]);
        }
        return extractedRules;
    }


    private getRule(rule: string): Array<string> {
        return rule.split('|');
    }

    // validate with the respective rule
    private async run(ruleName: string, fieldName: string, value: any) {
        let rule: string = ruleName.split(':')[0]; // extract exact rule name;
        let response: boolean;
        switch (rule) {
            case "unique":
                try {
                    response = await UniqueValidation.validate(ruleName, value, this.model!);
                    if (!response) {
                        this.addErrorToBug(fieldName, UniqueValidation.getErrorMessage(fieldName)!);
                    }
                } catch (error) {
                    this.addErrorToBug(fieldName, ErrorMessage.inValidData(fieldName)!)
                }
                break;
            case "exists":
                try {
                    response = await ExistValidation.validate(ruleName, value, this.model!);
                    if (!response) {
                        this.addErrorToBug(fieldName, ExistValidation.getErrorMessage(fieldName)!);
                    }
                } catch (error) {
                    this.addErrorToBug(fieldName, ErrorMessage.inValidData(fieldName)!)
                }
                break;
            case "phone":
                if (!(PhoneNumberValidation.validate(ruleName, value))) {
                    this.addErrorToBug(fieldName, PhoneNumberValidation.getErrorMessage(fieldName)!);
                }
                break;
            case "required":
                RequiredValidation.validate(value) ? null :
                    this.addErrorToBug(fieldName, RequiredValidation.getErrorMessage(fieldName)!);
                break;
            case "email":
                EmailValidation.validate(value) ? null :
                    this.addErrorToBug(fieldName, EmailValidation.getErrorMessage(fieldName)!);
                break;
            case "string":
                StringValidation.validate(value) ? null :
                    this.addErrorToBug(fieldName, StringValidation.getErrorMessage(fieldName)!);
                break;
        }
    }

    private addErrorToBug(key: string, value: string) {
        if (!this.errorBug[key])
            this.errorBug[key] = [];
        this.errorBug[key].push({ error_message: value, error_code: 400 });
    }
}