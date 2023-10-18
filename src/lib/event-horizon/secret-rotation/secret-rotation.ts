import { SecretRotationEvent } from '../../aws/secret-rotation/secret-rotation.type.js'

import type { Dependent, RequireKeys } from '@skyleague/axioms'
import type { DefaultServices, SecretRotationHandler, SecretRotationRequest } from '@skyleague/event-horizon'
import { arbitrary } from '@skyleague/therefore'

export function secretRotationEvent<Configuration, Service extends RequireKeys<DefaultServices, 'secretsManager'>, Profile>(
    _definition?: Pick<SecretRotationHandler<Configuration, Service, Profile>, 'services' | 'config'>
): Dependent<SecretRotationRequest> {
    return arbitrary(SecretRotationEvent).map((e) => ({
        raw: e,
        step: e.Step,
        secretId: e.SecretId,
        clientRequestToken: e.ClientRequestToken,
    }))
}
