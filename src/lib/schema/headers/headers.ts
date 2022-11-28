import type { CstNode, ObjectPropertiesArg, SchemaOptions, LazyObjectOptions } from '@skyleague/therefore'
import { $validator, isCstNode, $object } from '@skyleague/therefore'

export function $headers(properties: CstNode | ObjectPropertiesArg, options?: SchemaOptions<LazyObjectOptions>) {
    const validator = $validator(isCstNode(properties) ? properties : $object(properties, options))
    validator.description.ajvOptions = { ...validator.description.ajvOptions, coerceTypes: true }
    return validator
}
