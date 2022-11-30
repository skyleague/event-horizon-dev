import type { FirehoseTransformationEvent } from './firehose.type'

import type { FirehoseTransformationEvent as LambdaFirehoseTransformationEvent } from 'aws-lambda'

test('type is compatible', () => {
    const _test: FirehoseTransformationEvent = {} as unknown as LambdaFirehoseTransformationEvent
    const _test2: LambdaFirehoseTransformationEvent = {} as unknown as FirehoseTransformationEvent
})
