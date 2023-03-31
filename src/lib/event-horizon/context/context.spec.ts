import { context } from './context.js'

import { Context } from '../../aws/index.js'

import { forAll } from '@skyleague/axioms'

test('context === context', async () => {
    forAll(await context(), (c) => Context.assert(c.raw))
})
