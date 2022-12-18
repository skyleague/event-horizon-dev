import type { ThereforeNode, ObjectPropertiesArg, SchemaOptions, LazyObjectOptions } from '@skyleague/therefore'
import { $validator, isThereforeNode, $object } from '@skyleague/therefore'

export function $headers(properties: ObjectPropertiesArg | ThereforeNode, options?: SchemaOptions<LazyObjectOptions>) {
    const validator = $validator(isThereforeNode(properties) ? properties : $object(properties, options))
    validator.description.ajvOptions = { ...validator.description.ajvOptions, coerceTypes: true }
    return validator
}
