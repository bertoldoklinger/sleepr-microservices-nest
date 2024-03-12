import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule as NestConfigModule } from '@nestjs/config';
import Joi from 'joi';
@Module({
  imports: [NestConfigModule.forRoot({
    validationSchema: Joi.object({
      MONGODB_URI: Joi.string().required(),
    }),
    isGlobal: true,
    envFilePath: '.env'
  })],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule { }
