import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GetAllUsers, UserController,  } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from './user.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UserController, GetAllUsers],
  providers: [UserService],
})
export class UserModule {}
