import { Module } from '@nestjs/common';
import { EntityModule } from 'src/entity/entity.module';
import { EncryptionService } from './encryption.service';

@Module({
  imports: [EntityModule],
  providers: [EncryptionService],
  exports: [EncryptionService],
})
export class EncryptionModule {}
