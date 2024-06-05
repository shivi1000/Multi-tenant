import { Module } from '@nestjs/common';
import { DatabaseService } from './db.service';
import { EncryptionService } from '../encrption/encryption.service';
import { Queries } from 'src/queryBuilder/employee';


@Module({
    providers: [DatabaseService, EncryptionService, Queries],
    exports: [DatabaseService],
})
export class DatabaseModule {}
