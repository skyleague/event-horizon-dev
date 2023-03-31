import { Logger as AwsLogger } from '@aws-lambda-powertools/logger'
import { Metrics as AwsMetrics } from '@aws-lambda-powertools/metrics'
import { Tracer as AwsTracer } from '@aws-lambda-powertools/tracer'
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
    const instance = new AwsLogger()
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
    const instance = new AwsTracer()
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
    const instance = new AwsMetrics()
    const metrics: jest.MaybeMocked<Metrics> & { mockClear: () => void } = {
        instance,
        add: jest.fn(),
        mockClear: () => {
            metrics.add.mockClear()
        },
    }
    return metrics
}
