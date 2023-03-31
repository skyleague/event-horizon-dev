import type { Context } from './context.type.js'

import type { Context as LambdaContext } from 'aws-lambda'

test('type is compatible', () => {
    const _test: Context = {} as unknown as LambdaContext
    // const _test2: LambdaContext = {} as unknown as Context
})
