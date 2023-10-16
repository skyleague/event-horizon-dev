import { SecretRotationEvent } from '../../aws/secret-rotation/secret-rotation.type.js'

import type { Dependent } from '@skyleague/axioms'
import type { DefaultServices, SecretRotationRequest } from '@skyleague/event-horizon'
import { arbitrary } from '@skyleague/therefore'

export function secretRotationEvent<Config, Service extends DefaultServices | undefined = undefined>(
    _options: { config?: Config; services?: Service } = {}
): Dependent<SecretRotationRequest> {
    return arbitrary(SecretRotationEvent).map((e) => ({
        raw: e,
        step: e.Step,
        secretId: e.SecretId,
        clientRequestToken: e.ClientRequestToken,
    }))
}
