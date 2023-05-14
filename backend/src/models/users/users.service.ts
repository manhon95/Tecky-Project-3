import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Op } from 'sequelize';
import { Question } from '../questions/entities/question.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userModel.create({
      username: createUserDto.username,
      password: createUserDto.password,
      email: createUserDto.email,
    });
  }

  findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  findAllUsers(): Promise<User[]> {
    return this.userModel.findAll({
      attributes: ['id', 'name'],
      where: {
        role: 'user',
      },
    });
  }

  findOne(id: number): Promise<User> {
    return this.userModel.findOne({
      attributes: ['id', 'name'],
      where: {
        id,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
}
