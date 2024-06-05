import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()

export class EncryptionService {
    constructor(private configService: ConfigService) {
    
    }
    private readonly algorithm = 'aes-256-cbc';
    private readonly key = crypto.scryptSync(this.configService.get<string>('ENCRYPTION_KEY') as string, 'salt', 32); // this will be same
    private readonly ivLength = 16; // this will be unique

    encrypt(text: string): string {
        const iv = crypto.randomBytes(this.ivLength);
        const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        const ivHex = iv.toString('hex');
        return `${ivHex}:${encrypted}`;
    }

    decrypt(encryptedText: string): string {
        try {
            const [ivHex, encrypted] = encryptedText.split(':');
            const iv = Buffer.from(ivHex, 'hex');
            const decipher = crypto.createDecipheriv(this.algorithm, this.key, iv);
            let decrypted = decipher.update(encrypted, 'hex', 'utf8');
            decrypted += decipher.final('utf8');
            return decrypted;
        } catch (error) {
            throw new Error('Decryption failed');
        }
    }
}