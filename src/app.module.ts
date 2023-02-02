import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { CommonController } from './modules/common/common.controller';
import { CommonService } from './modules/common/common.service';
import { CommonModule } from './modules/common/common.module';
import { SystemModule } from './modules/system/system.module';

@Module({
  imports: [UserModule, CommonModule, SystemModule],
  controllers: [CommonController],
  providers: [CommonService],
})
export class AppModule {}
