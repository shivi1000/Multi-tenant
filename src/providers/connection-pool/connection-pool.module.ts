import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/providers/database/db.service';
import { ConnectionPoolService } from './connection-pool.service';
import { EncryptionService } from '../encrption/encryption.service';

@Module({
    providers: [DatabaseService, ConnectionPoolService, EncryptionService],
    exports: [DatabaseService, ConnectionPoolService],
})
export class ConnectionPoolModule {}
