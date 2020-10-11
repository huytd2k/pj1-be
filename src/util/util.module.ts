import { Module } from '@nestjs/common';
import { EncryptHelper } from './encrypt.util';

@Module({
    providers: [{
        provide: "ENCRYPT_HELPER",
        useValue: EncryptHelper
    }]
})
export class UtilModule {}
