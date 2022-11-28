import { SNSEventRecord } from '../../aws/sns/sns.schema'

import type { Dependent } from '@skyleague/axioms'
import { object, unknown } from '@skyleague/axioms'
import type { SNSEvent, SnsHandler } from '@skyleague/event-horizon'
import { arbitrary } from '@skyleague/therefore'

export function snsEvent<C = unknown, S = unknown, SNSP = unknown>(
    definition: SnsHandler<C, S, SNSP>
): Dependent<SNSEvent<SNSP>> {
    const { sns } = definition
    return object({
        payload: sns.schema.payload !== undefined ? arbitrary(sns.schema.payload) : unknown(),
        raw: arbitrary(SNSEventRecord),
    }) as unknown as Dependent<SNSEvent<SNSP>>
}
