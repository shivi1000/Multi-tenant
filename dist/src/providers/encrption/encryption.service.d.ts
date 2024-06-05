import { ConfigService } from '@nestjs/config';
export declare class EncryptionService {
    private configService;
    constructor(configService: ConfigService);
    private readonly algorithm;
    private readonly key;
    private readonly ivLength;
    encrypt(text: string): string;
    decrypt(encryptedText: string): string;
}
