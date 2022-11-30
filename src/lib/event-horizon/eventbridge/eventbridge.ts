import { EventBridgeEvent as AWSEventBridgeEvent } from '../../aws'

import type { Dependent } from '@skyleague/axioms'
import { tuple, unknown } from '@skyleague/axioms'
import type { EventBridgeEvent, EventBridgeHandler } from '@skyleague/event-horizon'
import { arbitrary } from '@skyleague/therefore'

export function eventBridgeEvent<C = never, S = never, P = unknown, R = unknown>(
    definition: EventBridgeHandler<C, S, P, R>
): Dependent<EventBridgeEvent<P>> {
    const { eventBridge } = definition
    const record = arbitrary(AWSEventBridgeEvent)
    const payload = eventBridge.schema.payload !== undefined ? arbitrary(eventBridge.schema.payload) : unknown()
    return tuple(record, payload).map(([r, p]) => ({
        raw: r,
        payload: p,
    })) as unknown as Dependent<EventBridgeEvent<P>>
}
