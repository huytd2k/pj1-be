import  * as bcrypt  from 'bcrypt';
export class EncryptHelper {
    static async hash(payload: string) {
       const res =  await bcrypt.hash(payload, 10);
       return res;
    }

    static async compare(plainText: string, hash: string) {
        return await bcrypt.compare(plainText, hash);
    }
}