import { Controller, Get, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';
import { Response } from 'express';

@Controller('create-user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() userData: User, @Res() res: Response): Promise<User | any> {
    try {
      const { name, email, password } = userData;

      const existingUser = await this.userService.findUserByEmail(email);
      if (existingUser) {
        return res.status(HttpStatus.CONFLICT).json({ message: 'User already exists' });
      }

      const newUser = await this.userService.createUser(name, email, password);
      res.status(HttpStatus.CREATED).json({message: "Success", data: newUser});
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Failed to create user' });
    }
  }
}


@Controller('users')
export class GetAllUsers {
  constructor(private readonly userService: UserService) {}
  @Get()
  async findAllUsers(@Res() res: Response): Promise<User[] | any> {
    try {
      const users = await this.userService.findAllUsers();
      res.status(HttpStatus.OK).json({message: "Success", data: users});
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Failed to fetch users' });
    }
  }
}

