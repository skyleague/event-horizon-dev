/**
 * Generated by @skyleague/therefore@v1.0.0-local
 * Do not manually touch this
 */
/* eslint-disable */
import AjvValidator from 'ajv'
import type { ValidateFunction } from 'ajv'

export interface SQSMessageAttribute {
    stringValue?: string | undefined
    binaryValue?: string | undefined
    stringListValues?: string[] | undefined
    binaryListValues?: string[] | undefined
    dataType: 'String' | 'Number' | 'Binary' | string
}

export interface SQSMessageAttributes {
    [k: string]: SQSMessageAttribute | undefined
}

export interface SQSRecordAttributes {
    AWSTraceHeader?: string | undefined
    ApproximateReceiveCount: string
    SentTimestamp: string
    SenderId: string
    ApproximateFirstReceiveTimestamp: string
    SequenceNumber?: string | undefined
    MessageGroupId?: string | undefined
    MessageDeduplicationId?: string | undefined
}

export interface SQSRecord {
    messageId: string
    receiptHandle: string
    body: string
    attributes: SQSRecordAttributes
    messageAttributes: SQSMessageAttributes
    md5OfBody: string
    eventSource: string
    eventSourceARN: string
    awsRegion: string
}

export const SQSRecord = {
    validate: require('./schemas/sqs-record.schema.js') as ValidateFunction<SQSRecord>,
    get schema() {
        return SQSRecord.validate.schema
    },
    get errors() {
        return SQSRecord.validate.errors ?? undefined
    },
    is: (o: unknown): o is SQSRecord => SQSRecord.validate(o) === true,
    assert: (o: unknown) => {
        if (!SQSRecord.validate(o)) {
            throw new AjvValidator.ValidationError(SQSRecord.errors ?? [])
        }
    },
} as const

export interface SQSEvent {
    Records: SQSRecord[]
}

export const SQSEvent = {
    validate: require('./schemas/sqs-event.schema.js') as ValidateFunction<SQSEvent>,
    get schema() {
        return SQSEvent.validate.schema
    },
    get errors() {
        return SQSEvent.validate.errors ?? undefined
    },
    is: (o: unknown): o is SQSEvent => SQSEvent.validate(o) === true,
    assert: (o: unknown) => {
        if (!SQSEvent.validate(o)) {
            throw new AjvValidator.ValidationError(SQSEvent.errors ?? [])
        }
    },
} as const
