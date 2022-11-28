/**
 * Generated by @skyleague/therefore@v1.0.0-local
 * Do not manually touch this
 */
/* eslint-disable */
import AjvValidator from 'ajv'
import type { ValidateFunction } from 'ajv'

export interface S3BatchEventTask {
    taskId: string
    s3Key: string
    s3VersionId: string | null
    s3BucketArn: string
}

export const S3BatchEventTask = {
    validate: require('./schemas/s3-batch-event-task.schema.js') as ValidateFunction<S3BatchEventTask>,
    get schema() {
        return S3BatchEventTask.validate.schema
    },
    get errors() {
        return S3BatchEventTask.validate.errors ?? undefined
    },
    is: (o: unknown): o is S3BatchEventTask => S3BatchEventTask.validate(o) === true,
    assert: (o: unknown) => {
        if (!S3BatchEventTask.validate(o)) {
            throw new AjvValidator.ValidationError(S3BatchEventTask.errors ?? [])
        }
    },
} as const

export interface S3BatchEventJob {
    id: string
}

export interface S3BatchEvent {
    invocationSchemaVersion: string
    invocationId: string
    job: S3BatchEventJob
    tasks: S3BatchEventTask[]
}

export const S3BatchEvent = {
    validate: require('./schemas/s3-batch-event.schema.js') as ValidateFunction<S3BatchEvent>,
    get schema() {
        return S3BatchEvent.validate.schema
    },
    get errors() {
        return S3BatchEvent.validate.errors ?? undefined
    },
    is: (o: unknown): o is S3BatchEvent => S3BatchEvent.validate(o) === true,
    assert: (o: unknown) => {
        if (!S3BatchEvent.validate(o)) {
            throw new AjvValidator.ValidationError(S3BatchEvent.errors ?? [])
        }
    },
} as const
