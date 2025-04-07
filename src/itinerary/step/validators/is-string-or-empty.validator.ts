import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

/**
 * Custom validator to check if a value is a string or an empty string.
 * @param validationOptions - Optional validation options.
 */
export function IsStringOrEmpty(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isStringOrEmpty',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return typeof value === 'string'; // Validates that the value is a string (including empty strings)
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a string or an empty string`;
        },
      },
    });
  };
}