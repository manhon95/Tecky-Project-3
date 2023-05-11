import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserQuestionDto } from './dto/create-user_question.dto';
import { UpdateUserQuestionDto } from './dto/update-user_question.dto';
import { UserQuestion } from './entities/user_question.entity';

@Injectable()
export class UsersQuestionsService {
  constructor(
    @InjectModel(UserQuestion)
    private userQuestionModel: typeof UserQuestion,
  ) {}

  create(createUserQuestionDto: CreateUserQuestionDto) {
    return 'This action adds a new usersQuestion';
  }

  findAll() {
    return `This action returns all usersQuestions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usersQuestion`;
  }

  update(id: number, updateUserQuestionDto: UpdateUserQuestionDto) {
    return `This action updates a #${id} usersQuestion`;
  }

  remove(id: number) {
    return `This action removes a #${id} usersQuestion`;
  }
}
