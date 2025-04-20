import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserRepository } from './users.repository';
import { User } from './entities/user.schema';
import * as bcrypt from 'bcryptjs';
import { JwtPayload } from 'src/auth/jwt-payload.interface';
import { S3Service } from 'src/common/s3/s3.service';
import { USER_IMAGE_FILE_EXTENSION, USERS_BUCKET } from './users.constants';
import { UserDocument } from './entities/user.document';
@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly s3Service: S3Service,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }

  s3Key(userId: string) {
    return `users/${userId}/profile.${USER_IMAGE_FILE_EXTENSION}`;
  }

  toEntity(userDocument: UserDocument): User {
    const user = {
      ...userDocument,
      imageURL: this.s3Service.getObjectUrl(
        USERS_BUCKET,
        this.s3Key(userDocument._id.toHexString()),
      ),
    } as Partial<UserDocument>;

    delete user.password;

    console.log(user)
    return user as User;
  }

  async create(createUserInput: CreateUserInput): Promise<User> {
    try {
      const user = this.toEntity(
        await this.userRepository.create({
          ...createUserInput,
          password: await this.hashPassword(createUserInput.password),
        }),
      );
      return user;
    } catch (error) {
      if (error.message.includes('E11000')) {
        throw new UnprocessableEntityException('Email already exists');
      }
      console.log(error);
      throw error;
    }
  }

  async uploadImage(file: Buffer, userId: string) {
    await this.s3Service.uploadFile({
      bucket: USERS_BUCKET,
      key: this.s3Key(userId),
      file,
    });
  }

  async findAll(): Promise<User[]> {
    return (await this.userRepository.find({})).map((userDocument) =>
      this.toEntity(userDocument),
    );
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ _id: id });
    return this.toEntity(user);
  }

  async update(id: string, updateUserInput: UpdateUserInput): Promise<User> {
    const user = await this.userRepository.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          ...updateUserInput,
          password: await this.hashPassword(updateUserInput.password),
        },
      },
    );
    return this.toEntity(user);
  }

  async remove(id: string): Promise<User> {
    return this.toEntity(
      await this.userRepository.findOneAndDelete({ _id: id }),
    );
  }

  async verifyUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({ email });
    
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.toEntity(user);
  }
}
