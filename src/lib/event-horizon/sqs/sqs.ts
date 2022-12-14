import { SQSRecord } from '../../aws/sqs/sqs.type'

import type { Dependent } from '@skyleague/axioms'
import { object, unknown } from '@skyleague/axioms'
import type { SQSEvent, SQSHandler } from '@skyleague/event-horizon'
import { arbitrary } from '@skyleague/therefore'

export function sqsEvent<Configuration = never, Service = never, Profile = never, Payload = unknown>(
    definition: SQSHandler<Configuration, Service, Profile, Payload>
): Dependent<SQSEvent<Payload>> {
    const { sqs } = definition
    return object({
        payload: sqs.schema.payload !== undefined ? arbitrary(sqs.schema.payload) : unknown(),
        raw: arbitrary(SQSRecord),
    }) as unknown as Dependent<SQSEvent<Payload>>
}
