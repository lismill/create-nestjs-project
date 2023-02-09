import { Module } from '@nestjs/common';
import { CommonModule } from './modules/common/common.module';
import { SystemModule } from './modules/system/system.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [CommonModule, SystemModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
