import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

/**
 * Custom validator to check if a value is a string or a non-empty string.
 * @param validationOptions - Optional validation options.
 */
export function IsStringOrNull(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isStringOrNull',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return typeof value === 'string' && value.trim().length > 0 || value === null;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a non-empty string or null`;
        },
      },
    });
  };
}