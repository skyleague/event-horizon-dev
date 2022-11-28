import { FirehoseTransformationEventRecord } from '../../aws/firehose'

import type { Dependent } from '@skyleague/axioms'
import { tuple, unknown } from '@skyleague/axioms'
import type { FirehoseTransformationEvent, FirehoseTransformationHandler } from '@skyleague/event-horizon'
import { arbitrary } from '@skyleague/therefore'

export function firehoseTransformationEvent<C = never, S = never, P = unknown, R = unknown>(
    definition: FirehoseTransformationHandler<C, S, P, R>
): Dependent<FirehoseTransformationEvent<P>> {
    const { firehose } = definition
    const record = arbitrary(FirehoseTransformationEventRecord)
    const payload = firehose.schema.payload !== undefined ? arbitrary(firehose.schema.payload) : unknown()
    return tuple(record, payload).map(([r, p]) => ({
        raw: r,
        payload: p,
    })) as unknown as Dependent<FirehoseTransformationEvent<P>>
}
