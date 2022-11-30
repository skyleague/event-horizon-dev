import type { S3Event } from './s3.type'

import type { S3Event as LambdaS3Event } from 'aws-lambda'

test('type is compatible', () => {
    const _test: S3Event = {} as unknown as LambdaS3Event
    const _test2: LambdaS3Event = {} as unknown as S3Event
})
