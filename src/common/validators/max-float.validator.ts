import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface
} from "class-validator";


@ValidatorConstraint({ name: 'maxFloat', async: false })
export class MaxIntegerConstraint implements ValidatorConstraintInterface {
    validate(value: any,  args: ValidationArguments) {
        const maxValue = args.constraints[0];

        if (typeof value !== 'number') {
            return false;
        }

        if (value < 1) {
            return false;
        }

        return value <= maxValue;

    }

    defaultMessage(args: ValidationArguments) {
        const maxValue = args.constraints[0];
        return `The property «${args.property}» must be an float greater than 1 and not exceeding ${maxValue}.`;
    }
}

export function MaxFloat(maxValue: number, validationOptions?: ValidationOptions) {
    return (object: any, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [maxValue],
            validator: MaxIntegerConstraint,
        });
    };
}
