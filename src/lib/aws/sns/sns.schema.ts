import { $array, $dict, $ref, $string, $validator, $optional, $object } from '@skyleague/therefore'

export const SNSMessageAttribute = $object({
    Type: $string,
    Value: $string,
})

export const SNSMessageAttributes = $dict($ref(SNSMessageAttribute))

export const SNSMessage = $object({
    SignatureVersion: $string,
    Timestamp: $string,
    Signature: $string,
    SigningCertURL: $string,
    MessageId: $string,
    Message: $string,
    MessageAttributes: $ref(SNSMessageAttributes),
    Type: $string,
    UnsubscribeURL: $string,
    TopicArn: $string,
    Subject: $optional($string),
    Token: $optional($string),
})

export const SNSEventRecord = $validator(
    $object({
        EventVersion: $string,
        EventSubscriptionArn: $string,
        EventSource: $string,
        Sns: $ref(SNSMessage),
    })
)

export const SNSEvent = $validator(
    $object({
        Records: $array($ref(SNSEventRecord)),
    })
)
