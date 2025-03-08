import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './common/config/database.config';
import { validationSchema } from './common/config/validation.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { mongooseConfig } from './common/config/mongoose.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      isGlobal: true,
      ignoreEnvFile: false,
      load: [databaseConfig],
      validationSchema: validationSchema,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: mongooseConfig,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
