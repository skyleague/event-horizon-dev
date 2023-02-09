import type { Logger, Metrics, Tracer } from '@skyleague/event-horizon'

export function mock<T>(): jest.MaybeMocked<T> & { mockClear(): void } {
    const cache = new Map<any, jest.Mock>()
    const handler: ProxyHandler<object> = {
        get: (_, name) => {
            if (name === 'mockClear') {
                return () => cache.clear()
            }

            if (!cache.has(name)) {
                cache.set(name, jest.fn().mockName(name.toString()))
            }

            return cache.get(name)
        },
    }
    return new Proxy({}, handler) as jest.MaybeMocked<T> & { mockClear(): void }
}

export function mockLogger(): jest.MaybeMocked<Logger> & { mockClear: () => void } {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
    const { Logger: AwsLogger } = require('@aws-lambda-powertools/logger')
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const instance = new AwsLogger() as Logger['instance']
    const shouldLogEvent = jest.spyOn(instance, 'shouldLogEvent')
    const logger: jest.MaybeMocked<Logger> & { mockClear: () => void } = {
        instance,
        debug: jest.fn(),
        info: jest.fn(),
        warn: jest.fn(),
        error: jest.fn(),
        child: jest.fn().mockImplementation(() => logger),
        setBindings: jest.fn(),
        mockClear: () => {
            logger.debug.mockClear()
            logger.info.mockClear()
            logger.warn.mockClear()
            logger.error.mockClear()
            logger.child.mockClear()
            logger.setBindings.mockClear()
            logger.child.mockImplementation(() => logger)
            shouldLogEvent.mockClear()
            shouldLogEvent.mockReturnValue(false)
        },
    }
    shouldLogEvent.mockReturnValue(false)
    logger.child.mockImplementation(() => logger)

    return logger
}

export function mockTracer(): jest.MaybeMocked<Tracer> & { mockClear: () => void } {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
    const { Tracer: AwsTracer } = require('@aws-lambda-powertools/tracer')
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const instance = new AwsTracer() as Tracer['instance']
    const tracer: jest.MaybeMocked<Tracer> & { mockClear: () => void } = {
        instance,
        trace: jest.fn(),
        captureAWSv3Client: jest.fn(),
        mockClear: () => {
            tracer.trace.mockClear()
            tracer.captureAWSv3Client.mockClear()
        },
    }
    return tracer
}

export function mockMetrics(): jest.MaybeMocked<Metrics> & { mockClear: () => void } {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
    const { Metrics: AwsMetrics } = require('@aws-lambda-powertools/metrics')
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const instance = new AwsMetrics() as Metrics['instance']
    const metrics: jest.MaybeMocked<Metrics> & { mockClear: () => void } = {
        instance,
        add: jest.fn(),
        mockClear: () => {
            metrics.add.mockClear()
        },
    }
    return metrics
}
