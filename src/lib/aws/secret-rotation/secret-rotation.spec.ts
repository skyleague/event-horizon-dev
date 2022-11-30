import type { SecretRotationEvent } from './secret-rotation.type'

import type { SecretsManagerRotationEvent as LambdaSecretRotationEvent } from 'aws-lambda'

test('type is compatible', () => {
    const _test: SecretRotationEvent = {} as unknown as LambdaSecretRotationEvent
    const _test2: LambdaSecretRotationEvent = {} as unknown as SecretRotationEvent
})
