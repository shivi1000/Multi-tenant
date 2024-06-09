import { Module } from '@nestjs/common';
import { DatabaseService } from './db.service';
import { EncryptionService } from '../encrption/encryption.service';


@Module({
    providers: [DatabaseService, EncryptionService],
    exports: [DatabaseService],
})
export class DatabaseModule {}
