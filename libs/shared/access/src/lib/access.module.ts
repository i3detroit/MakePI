import { Module } from '@nestjs/common';
import { AccessService } from './access.service';
import { AccessGuard } from './access.guard';
import { AccessStrategy } from './access.strategy';

@Module({
  controllers: [],
  providers: [AccessService, AccessGuard, AccessStrategy],
  exports: [AccessStrategy, AccessGuard],
})
export class SharedAccessModule {}
