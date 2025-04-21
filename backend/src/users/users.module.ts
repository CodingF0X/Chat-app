import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { UserRepository } from './users.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { S3Module } from 'src/common/s3/s3.module';
import { UserDocument, UserModel } from './entities/user.document';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register(),
    MongooseModule.forFeature([
      {
        name: UserDocument.name,
        schema: UserModel,
      },
    ]),
    S3Module,
  ],
  providers: [UsersResolver, UsersService, UserRepository],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
