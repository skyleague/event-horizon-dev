import { FirehoseTransformationEventRecord } from '../../aws/firehose/index.js'

import type { Dependent } from '@skyleague/axioms'
import { tuple, unknown } from '@skyleague/axioms'
import type { FirehoseTransformationEvent, FirehoseTransformationHandler } from '@skyleague/event-horizon'
import { arbitrary } from '@skyleague/therefore'

export function firehoseTransformationEvent<
    Configuration = never,
    Service = never,
    Profile = never,
    Payload = unknown,
    Result = unknown
>(
    definition: FirehoseTransformationHandler<Configuration, Service, Profile, Payload, Result>
): Dependent<FirehoseTransformationEvent<Payload>> {
    const { firehose } = definition
    const record = arbitrary(FirehoseTransformationEventRecord)
    const payload = firehose.schema.payload !== undefined ? arbitrary(firehose.schema.payload) : unknown()
    return tuple(record, payload).map(([r, p]) => ({
        raw: r,
        payload: p,
    })) as unknown as Dependent<FirehoseTransformationEvent<Payload>>
}
