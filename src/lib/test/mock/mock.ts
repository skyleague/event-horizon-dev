import { Logger as AwsLogger } from '@aws-lambda-powertools/logger'
import { Metrics as AwsMetrics } from '@aws-lambda-powertools/metrics'
import { Tracer as AwsTracer } from '@aws-lambda-powertools/tracer'
import type { Logger, Metrics, Tracer } from '@skyleague/event-horizon'
import { vi } from 'vitest'

export function mockLogger() {
    const instance = new AwsLogger()
    const shouldLogEvent = vi.spyOn(instance, 'shouldLogEvent')
    shouldLogEvent.mockReturnValue(false)
    const impl = {
        instance,
        debug: vi.fn(),
        info: vi.fn(),
        warn: vi.fn(),
        error: vi.fn(),
        critical: vi.fn(),
        child: vi.fn().mockImplementation(() => logger),
        setBindings: vi.fn(),
        mockClear: () => {
            impl.debug.mockClear()
            impl.info.mockClear()
            impl.warn.mockClear()
            impl.error.mockClear()
            impl.critical.mockClear()
            impl.child.mockClear()
            impl.setBindings.mockClear()
            impl.child.mockImplementation(() => logger)
            shouldLogEvent.mockClear()
            shouldLogEvent.mockReturnValue(false)
        },
    }
    const logger = vi.mocked<Logger & { mockClear: () => void }>(impl as Logger & { mockClear: () => void })
    return logger
}

export function mockTracer() {
    const instance = new AwsTracer()
    const tracer = vi.mocked<Tracer & { mockClear: () => void }>({
        instance,
        trace: vi.fn(),
        captureAWSv3Client: vi.fn(),
        mockClear: () => {
            tracer.trace.mockClear()
            tracer.captureAWSv3Client.mockClear()
        },
    })
    return tracer
}

export function mockMetrics() {
    const instance = new AwsMetrics()
    const metrics = vi.mocked<Metrics & { mockClear: () => void }>({
        instance,
        add: vi.fn(),
        mockClear: () => {
            metrics.add.mockClear()
        },
    })
    return metrics
}
