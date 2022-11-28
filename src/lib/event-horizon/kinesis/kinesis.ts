import { KinesisStreamRecord } from '../../aws/kinesis'

import type { Dependent } from '@skyleague/axioms'
import { tuple, unknown } from '@skyleague/axioms'
import type { KinesisEvent, KinesisHandler } from '@skyleague/event-horizon'
import { arbitrary } from '@skyleague/therefore'

export function kinesisEvent<C = never, S = never, P = unknown>(definition: KinesisHandler<C, S, P>): Dependent<KinesisEvent<P>> {
    const { kinesis } = definition
    const record = arbitrary(KinesisStreamRecord)
    const payload = kinesis.schema.payload !== undefined ? arbitrary(kinesis.schema.payload) : unknown()
    return tuple(record, payload).map(([r, p]) => ({
        raw: r,
        payload: p,
    })) as unknown as Dependent<KinesisEvent<P>>
}
