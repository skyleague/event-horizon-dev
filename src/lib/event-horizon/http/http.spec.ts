import { httpEvent } from './http.js'

import { APIGatewayProxyEvent } from '../../aws/apigateway/index.js'

import { forAll, isString } from '@skyleague/axioms'

test('httpEvent === httpEvent', () => {
    forAll(httpEvent({ http: { method: 'get', path: '/', handler: jest.fn(), schema: { responses: {} } } }), (e) =>
        APIGatewayProxyEvent.assert(e.raw)
    )
})

test('httpEvent body === body', () => {
    forAll(
        httpEvent({
            http: {
                method: 'get',
                path: '/',
                handler: jest.fn(),
                schema: { body: { schema: { type: 'string' } } as any, responses: {} },
            },
        }),
        (e) => isString(e.body)
    )
})
