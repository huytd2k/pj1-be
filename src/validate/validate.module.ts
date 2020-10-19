import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { UniqueUsernameValidator } from './unique-username.validator';

@Module({
    imports: [UserModule],
    providers: [UniqueUsernameValidator]
})
export class ValidateModule {}
