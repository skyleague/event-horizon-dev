import { Context } from '../../aws/lambda'
import { mock } from '../../test'

import type { Arbitrary, Dependent } from '@skyleague/axioms'
import { constant, isFunction, object, random, string } from '@skyleague/axioms'
import type { Config, EventHandlerDefinition, LambdaContext, Logger, Metrics, Services, Tracer } from '@skyleague/event-horizon'
import { arbitrary } from '@skyleague/therefore'
import type { Context as AwsContext } from 'aws-lambda'

export interface ContextOptions {
    exhaustive?: boolean
}

export async function context<C = never, S = never>(
    { config, services, isSensitive }: EventHandlerDefinition & { config?: Config<C>; services?: Services<C, S> } = {},
    options: ContextOptions = {}
): Promise<Dependent<LambdaContext<C, S> & { mockClear: () => void }>> {
    const { exhaustive = false } = options
    const configObj = isFunction(config) ? await config() : config
    const ctxArb = arbitrary(Context) as Dependent<AwsContext>
    return object({
        logger: constant(mock<Logger>()),
        tracer: constant(mock<Tracer>()),
        metrics: constant(mock<Metrics>()),
        requestId: string({ minLength: 2 }),
        traceId: string({ minLength: 2 }),
        isSensitive: constant(isSensitive ?? false),
        raw: exhaustive ? ctxArb : constant(random(ctxArb)),
        config: constant(configObj) as Arbitrary<C>,
        services: constant(isFunction(services) ? await services(configObj as C) : services) as Arbitrary<S>,
    })
        .map((o) => {
            return {
                ...o,
                mockClear: () => {
                    // reset state on each evaluation
                    o.logger.mockClear()
                    o.tracer.mockClear()
                    o.metrics.mockClear()
                },
            }
        })
        .map((o) => {
            o.mockClear()
            return o
        })
}
