import { secretRotationEvent } from './secret-rotation'

import { SecretRotationEvent } from '../../aws/secret-rotation/secret-rotation.type'

import { forAll } from '@skyleague/axioms'

test('SecretRotationEvent === SecretRotationRequest.raw', () => {
    forAll(secretRotationEvent(), (r) => SecretRotationEvent.assert(r.raw))
})
