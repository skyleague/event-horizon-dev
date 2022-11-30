import { context } from './context'

import { Context } from '../../aws'

import { forAll } from '@skyleague/axioms'

test('context === context', async () => {
    forAll(await context(), (c) => Context.assert(c.raw))
})
