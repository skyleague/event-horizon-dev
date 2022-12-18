import type { ThereforeNode, LazyObjectOptions, ObjectPropertiesArg, SchemaOptions } from '@skyleague/therefore'
import { $object, $validator, isThereforeNode } from '@skyleague/therefore'

export function $query(properties: ObjectPropertiesArg | ThereforeNode, options?: SchemaOptions<LazyObjectOptions>) {
    const validator = $validator(isThereforeNode(properties) ? properties : $object(properties, options))
    validator.description.ajvOptions = { ...validator.description.ajvOptions, coerceTypes: true }
    return validator
}
