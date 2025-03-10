import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from 'src/common/database/abstract.repository';
import { UserSchema } from './entities/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository extends AbstractRepository<UserSchema> {
  protected readonly logger: Logger = new Logger(UserRepository.name);

  constructor(@InjectModel(UserSchema.name) userModel: Model<UserSchema>) {
    super(userModel);
  }
}
