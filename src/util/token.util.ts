import * as jwt from 'jsonwebtoken'

export class TokenHelper {
    static generateToken(payload :string, expriresIn: number) {
        return jwt.sign(payload, "secret", {expiresIn: expriresIn})
    }
    static verifyToken(token: string) {
        return jwt.verify(token, "secret");
    }
}