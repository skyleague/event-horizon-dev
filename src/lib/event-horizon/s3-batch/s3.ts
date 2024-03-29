import { S3BatchEvent, S3BatchEventTask } from '../../aws/index.js'

import type { Dependent } from '@skyleague/axioms'
import { omit, tuple } from '@skyleague/axioms'
import type { S3BatchTask } from '@skyleague/event-horizon/src/events/s3-batch/types.js'
import { arbitrary } from '@skyleague/therefore'

export function s3BatchTask(): Dependent<S3BatchTask> {
    const task = arbitrary(S3BatchEventTask)
    const event = arbitrary(S3BatchEvent)
    return tuple(task, event).map(([t, e]) => ({
        taskId: t.taskId,
        s3Key: t.s3Key,
        s3VersionId: t.s3VersionId,
        s3BucketArn: t.s3BucketArn,
        raw: {
            task: task,
            job: omit(e, ['tasks']),
        },
    })) as unknown as Dependent<S3BatchTask>
}
