import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: () => ({
      uri: 'mongodb://mongo:27017/sleepr'
    }),
    inject: [ConfigService],
  })],
})
export class DatabaseModule { 
  static forFeature(models: ModelDefinition[]) {
    return MongooseModule.forFeature(models)
  }
}
