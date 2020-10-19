import { Injectable } from "@nestjs/common";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UserService } from "src/user/user.service";

@ValidatorConstraint({name: 'isUsernameUnique', async: true}) 
@Injectable()
export class UniqueUsernameValidator implements ValidatorConstraintInterface {
    constructor(
        private readonly userService: UserService
    ) {};
    async validate(value: string, validationArguments?: ValidationArguments): Promise<boolean> {
        const foundExistedUsername = await this.userService.findByUsername(value);
        return !foundExistedUsername;
    }
    defaultMessage?(validationArguments?: ValidationArguments): string {
        return `${validationArguments.value} is existed !`
    }

}