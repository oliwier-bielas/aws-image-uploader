import { ServiceUnavailableException } from '@nestjs/common';

export class S3UploadException extends ServiceUnavailableException {
    constructor(cause?: unknown) {
        super('Failed to upload file to S3', {
            cause
        });
    }
}