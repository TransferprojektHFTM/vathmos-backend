import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'noScriptTags', async: false })
export class NoScriptTagsConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    if (typeof value !== 'string') {
      return true; // skip validation for non-string values
    }

    // Check if the string contains script tags
    return !/<\s*script[^>]*>/i.test(value);
  }

  defaultMessage(args: ValidationArguments) {
    return 'The value should not contain script tags.';
  }
}

export function NoScriptTags(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: NoScriptTagsConstraint,
    });
  };
}
