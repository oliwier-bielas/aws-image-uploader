import { ServiceUnavailableException } from '@nestjs/common';

export class S3DeleteException extends ServiceUnavailableException {
    constructor(cause?: unknown) {
        super('Failed to delete file from S3', {
            cause
        });
    }
}