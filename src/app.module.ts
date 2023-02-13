import { Module } from '@nestjs/common';
import { CommonModule } from './modules/common/common.module';
import { SystemModule } from './modules/system/system.module';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
      isGlobal: true,
    }),
    CommonModule,
    SystemModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
