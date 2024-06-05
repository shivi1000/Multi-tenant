import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/providers/database/db.service';
import { ConnectionPoolService } from './connection-pool.service';
import { EncryptionService } from '../encrption/encryption.service';
import { Queries } from 'src/queryBuilder/employee';

@Module({
    providers: [DatabaseService, ConnectionPoolService, EncryptionService, Queries],
    exports: [DatabaseService, ConnectionPoolService],
})
export class ConnectionPoolModule {}
