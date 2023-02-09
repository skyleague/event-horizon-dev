import { Context } from '../../aws/lambda'
import { mockLogger, mockMetrics, mockTracer } from '../../test/mock/mock'

import type { Arbitrary, Dependent } from '@skyleague/axioms'
import { constant, isFunction, object, random, string } from '@skyleague/axioms'
import type { Config, EventHandlerDefinition, LambdaContext, Services } from '@skyleague/event-horizon'
import type { ProfileSchema } from '@skyleague/event-horizon/dist/events/common/profile-handler'
import { arbitrary } from '@skyleague/therefore'
import type { Context as AwsContext } from 'aws-lambda'

export interface ContextOptions {
    exhaustive?: boolean
}

export async function context<Configuration = never, Service = never, Profile = never>(
    {
        config,
        services,
        profile,
        isSensitive,
    }: Omit<EventHandlerDefinition, 'config' | 'profile' | 'services'> & {
        config?: Config<Configuration>
        services?: Services<Configuration, Service>
        profile?: ProfileSchema<Profile>
    } = {},
    options: ContextOptions = {}
): Promise<Dependent<LambdaContext<Configuration, Service, Profile> & { mockClear: () => void }>> {
    const { exhaustive = false } = options
    const configObj = isFunction(config) ? await config() : config
    const ctxArb = arbitrary(Context) as Dependent<AwsContext>
    return object({
        logger: constant(mockLogger()),
        tracer: constant(mockTracer()),
        metrics: constant(mockMetrics()),
        requestId: string({ minLength: 2 }),
        traceId: string({ minLength: 2 }),
        isSensitive: constant(isSensitive ?? false),
        raw: exhaustive ? ctxArb : constant(random(ctxArb)),
        config: constant(configObj) as Arbitrary<Configuration>,
        services: constant(isFunction(services) ? await services(configObj as Configuration) : services) as Arbitrary<Service>,
        profile: constant(profile) as Arbitrary<Profile>,
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
