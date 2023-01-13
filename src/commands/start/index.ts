/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { context } from '../../lib'

import { entriesOf, random, valuesOf } from '@skyleague/axioms'
import type { EventHandler } from '@skyleague/event-horizon/dist/handlers/types'
import type { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import express from 'express'
import Router from 'express-promise-router'
import type { Argv } from 'yargs'

import path from 'path'

export function builder(yargs: Argv): Argv<{ dir: string | undefined; debug?: boolean }> {
    return yargs.option('debug', { default: true }).positional('dir', {
        type: 'string',
    })
}

const app = express()

export async function handler(argv: ReturnType<typeof builder>['argv']): Promise<void> {
    const { dir = process.cwd(), debug } = await argv

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const handlers = require(path.join(path.resolve(dir), '.'))

    if (debug) {
        process.env.IS_DEBUG = 'true'
        process.env.POWERTOOLS_DEV = 'true'
    }

    const router = Router()
    app.use(router)

    for (const e of valuesOf(handlers)) {
        const endpoint = e as EventHandler
        if ('http' in endpoint) {
            const translatedPath = endpoint.http.path.replace(/{(.+?)}/g, ':$1')

            console.log(`${endpoint.http.method.toUpperCase()} http://localhost:3000${endpoint.http.path}`)

            router[endpoint.http.method](translatedPath, async (req, res) => {
                const result = (await (endpoint as unknown as APIGatewayProxyHandler)(
                    {
                        headers: req.headers as Record<string, string>,
                        queryStringParameters: req.query as Record<string, string>,
                        pathParameters: req.params,
                        body: req.body,
                    } as any,
                    random(await context()).raw,
                    {} as any
                )) as APIGatewayProxyResult

                for (const [header, val] of entriesOf(result.headers ?? {})) {
                    res.set(header, val.toString())
                }
                res.status(result.statusCode)
                if (
                    Object.entries(result.headers ?? {})
                        .find(([header]) => header.toLowerCase() === 'content-type')?.[1]
                        ?.toString()
                        ?.includes('json') === true
                ) {
                    res.json(JSON.parse(result.body))
                } else {
                    res.send(result.body)
                }
            })
        }
    }

    app.listen(3000, () => console.log('listening on port: 3000'))
}

export default {
    command: 'start [dir]',
    describe: 'start the service locally',
    builder,
    handler,
}
