import { APIGatewayProxyEvent } from '../../aws/apigateway/index.js'

import type { Dependent } from '@skyleague/axioms'
import { constant, object } from '@skyleague/axioms'
import type { GatewayVersion, HTTPHandler, HTTPRequest } from '@skyleague/event-horizon'
import { arbitrary } from '@skyleague/therefore'

export function httpEvent<
    Configuration,
    Service,
    Profile,
    Body,
    Path,
    Query,
    Headers,
    Result,
    GV extends GatewayVersion = 'rest',
>(
    definition: HTTPHandler<Configuration, Service, Profile, Body, Path, Query, Headers, Result, GV>
): Dependent<HTTPRequest<Body, Path, Query, Headers, GV>> {
    const { http } = definition
    const { bodyType = 'json' } = http

    const body = http.schema.body !== undefined ? arbitrary(http.schema.body) : constant(undefined)
    const headers = http.schema.headers !== undefined ? arbitrary(http.schema.headers) : constant(undefined)
    const query = http.schema.query !== undefined ? arbitrary(http.schema.query) : constant(undefined)
    const path = http.schema.path !== undefined ? arbitrary(http.schema.path) : constant(undefined)
    const raw = arbitrary(APIGatewayProxyEvent)

    return raw.chain((r) => {
        return object({
            body,
            headers,
            query,
            path,
            raw: constant(r),
        }).map((event) => {
            if (bodyType !== 'binary') {
                const eventBody = event.body ?? event.raw.body
                const b = (bodyType === 'json' ? JSON.stringify(eventBody) : eventBody) ?? ''
                event.raw.body = (
                    event.raw.isBase64Encoded ? Buffer.from(b.toString()).toString('base64') : b
                ) as typeof event.raw.body
            }

            // force coercion
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            http.schema.body?.is?.(event.body)
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            http.schema.headers?.is?.(event.headers)
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            http.schema.query?.is?.(event.query)
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            http.schema.path?.is?.(event.path)

            event.raw.headers ??= (event.headers as typeof event.raw.headers) ?? {}
            event.raw.queryStringParameters ??= (event.query as typeof event.raw.queryStringParameters) ?? {}
            const rawEvent = event.raw
            return {
                ...event,
                get raw() {
                    return rawEvent
                },
            }
        })
    }) as unknown as Dependent<HTTPRequest<Body, Path, Query, Headers, GV>>
}
