/**
 * Generated by @skyleague/therefore@v1.0.0-local
 * Do not manually touch this
 */
/* eslint-disable */
import AjvValidator from 'ajv'
import type { ValidateFunction } from 'ajv'

export interface SecretRotationEvent {
    Step: 'createSecret' | 'finishSecret' | 'setSecret' | 'testSecret'
    SecretId: string
    ClientRequestToken: string
}

export const SecretRotationEvent = {
    validate: (await import('./schemas/secret-rotation-event.schema.js'))
        .validate10 as unknown as ValidateFunction<SecretRotationEvent>,
    get schema() {
        return SecretRotationEvent.validate.schema
    },
    get errors() {
        return SecretRotationEvent.validate.errors ?? undefined
    },
    is: (o: unknown): o is SecretRotationEvent => SecretRotationEvent.validate(o) === true,
    assert: (o: unknown) => {
        if (!SecretRotationEvent.validate(o)) {
            throw new AjvValidator.ValidationError(SecretRotationEvent.errors ?? [])
        }
    },
} as const
