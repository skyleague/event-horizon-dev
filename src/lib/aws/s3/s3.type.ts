/**
 * Generated by @skyleague/therefore@v1.0.0-local
 * Do not manually touch this
 */
/* eslint-disable */
import AjvValidator from 'ajv'
import type { ValidateFunction } from 'ajv'

export interface S3Event {
    Records: S3EventRecord[]
}

export const S3Event = {
    validate: (await import('./schemas/s3-event.schema.js')).validate10 as unknown as ValidateFunction<S3Event>,
    get schema() {
        return S3Event.validate.schema
    },
    get errors() {
        return S3Event.validate.errors ?? undefined
    },
    is: (o: unknown): o is S3Event => S3Event.validate(o) === true,
    assert: (o: unknown) => {
        if (!S3Event.validate(o)) {
            throw new AjvValidator.ValidationError(S3Event.errors ?? [])
        }
    },
} as const

export interface S3EventRecord {
    eventVersion: string
    eventSource: string
    awsRegion: string
    eventTime: string
    eventName: string
    userIdentity: {
        principalId: string
    }
    requestParameters: {
        sourceIPAddress: string
    }
    responseElements: {
        'x-amz-request-id': string
        'x-amz-id-2': string
    }
    s3: {
        s3SchemaVersion: string
        configurationId: string
        bucket: {
            name: string
            ownerIdentity: {
                principalId: string
            }
            arn: string
        }
        object: {
            key: string
            size: number
            eTag: string
            versionId?: string | undefined
            sequencer: string
        }
    }
    glacierEventData?:
        | {
              restoreEventData: {
                  lifecycleRestorationExpiryTime: string
                  lifecycleRestoreStorageClass: string
              }
          }
        | undefined
}

export const S3EventRecord = {
    validate: (await import('./schemas/s3-event-record.schema.js')).validate10 as unknown as ValidateFunction<S3EventRecord>,
    get schema() {
        return S3EventRecord.validate.schema
    },
    get errors() {
        return S3EventRecord.validate.errors ?? undefined
    },
    is: (o: unknown): o is S3EventRecord => S3EventRecord.validate(o) === true,
    assert: (o: unknown) => {
        if (!S3EventRecord.validate(o)) {
            throw new AjvValidator.ValidationError(S3EventRecord.errors ?? [])
        }
    },
} as const

export interface S3EventRecordGlacierEventData {
    restoreEventData: {
        lifecycleRestorationExpiryTime: string
        lifecycleRestoreStorageClass: string
    }
}