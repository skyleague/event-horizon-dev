import type { SQSRecord } from './sqs.type.js'

import type { SQSRecord as LambdaSqsRecord } from 'aws-lambda'

test('type is compatible', () => {
    const _test: SQSRecord = {} as unknown as LambdaSqsRecord
    // const _test2: LambdaSqsRecord = {} as unknown as SQSRecord
})
