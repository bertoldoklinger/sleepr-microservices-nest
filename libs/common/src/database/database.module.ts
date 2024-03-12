import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: () => ({
      uri: 'mongodb://localhost/sleepr'
    }),
    inject: [ConfigService],
  })],
})
export class DatabaseModule { }
