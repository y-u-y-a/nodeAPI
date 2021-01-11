import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'
import { getManager } from 'typeorm'

/** ****************************************
 * Entityで使用するためのカスタムバリデーション
 * class-validatorにないものはここでカスタマイズ
 * entity内のみの使用を想定
 *******************************************/
export const Unique = (
  entity: Function,
  validationOptions?: ValidationOptions
) => {
  // set default value
  validationOptions = {
    ...{ message: '$value already exists. Choose another.' },
    ...validationOptions,
  }
  return (object: any, propertyName: string) => {
    object[`class_entity_${propertyName}`] = entity
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: UniqueOnDatabaseExistConstraint,
    })
  }
}

// private
@ValidatorConstraint({ async: true })
export class UniqueOnDatabaseExistConstraint
  implements ValidatorConstraintInterface {
  async validate(value: any, args: ValidationArguments) {
    const entity = (args as any).object[`class_entity_${args.property}`]
    return getManager()
      .count(entity, { [args.property]: value })
      .then((count) => count < 1)
  }
}
