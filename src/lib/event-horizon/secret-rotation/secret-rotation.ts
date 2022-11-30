import { SecretRotationEvent } from '../../aws/secret-rotation/secret-rotation.type'

import type { Dependent } from '@skyleague/axioms'
import type { SecretRotationRequest, SecretRotationServices } from '@skyleague/event-horizon'
import { arbitrary } from '@skyleague/therefore'

export function secretRotationEvent<Config = never, Services extends SecretRotationServices = SecretRotationServices>(
    _options: { config?: Config; services?: Services } = {}
): Dependent<SecretRotationRequest> {
    return arbitrary(SecretRotationEvent).map((e) => ({
        raw: e,
        step: e.Step,
        secretId: e.SecretId,
        clientRequestToken: e.ClientRequestToken,
    }))
}
