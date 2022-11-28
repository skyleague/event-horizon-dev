import type { KinesisStreamEvent } from './kinesis.type'

import type { KinesisStreamEvent as LambdaKinesisStreamEvent } from 'aws-lambda'

test('type is compatible', () => {
    const _test: KinesisStreamEvent = {} as unknown as LambdaKinesisStreamEvent
    const _test2: LambdaKinesisStreamEvent = {} as unknown as KinesisStreamEvent
})
