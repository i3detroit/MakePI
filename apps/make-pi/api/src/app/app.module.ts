import { Module } from '@nestjs/common';

import { DatabaseModule } from '@make-pi/shared/database';
import { UsersModule } from '@make-pi/models/users';

@Module({
  imports: [DatabaseModule, UsersModule],
})
export class AppModule {}
