import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';
import { MongodDbService } from '../mongo-db.service';
import { Model } from 'mongoose';
import { User } from './interface/user';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiUseTags('users')
@Controller('users')
export class UsersController {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly dbService: MongodDbService,
  ) {}

  @Get()
  @ApiResponse({ status: 200, type: [User] })
  async getAll(): Promise<User[]> {
    return this.dbService.getAll(this.userModel);
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: User })
  async findOne(@Param('id') id: string): Promise<User> {
    return this.dbService.findOne(this.userModel, id);
  }

  @Post()
  @ApiResponse({
    status: 201,
    type: User,
    description: 'User has been successfully created.',
  })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.dbService.create(this.userModel, createUserDto);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    type: User,
    description: 'User has been successfully updated.',
  })
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.dbService.update(this.userModel, id, updateUserDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'User has bee successfully removed',
  })
  async removeUser(@Param('id') id: string): Promise<void> {
    return this.dbService.delete(this.userModel, id);
  }
}