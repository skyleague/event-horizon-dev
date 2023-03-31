import { secretRotationEvent } from './secret-rotation.js'

import { SecretRotationEvent } from '../../aws/secret-rotation/secret-rotation.type.js'

import { forAll } from '@skyleague/axioms'

test('SecretRotationEvent === SecretRotationRequest.raw', () => {
    forAll(secretRotationEvent(), (r) => SecretRotationEvent.assert(r.raw))
})
