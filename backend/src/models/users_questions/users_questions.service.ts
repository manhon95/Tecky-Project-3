import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserQuestionDto } from './dto/create-user_question.dto';
import { UpdateUserQuestionDto } from './dto/update-user_question.dto';
import { UserQuestion } from './entities/user_question.entity';
import { Question } from '../questions/entities/question.entity';

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

  findAllByUser(user_id: number): Promise<UserQuestion[]> {
    return this.userQuestionModel.findAll({
      include: { model: Question, attributes: ['question'] },
      attributes: ['id', 'answer'],
      where: {
        user_id,
      },
    });
  }

  findOne(user_id: number, question_id: number) {
    return this.userQuestionModel.findAll({
      include: { model: Question, attributes: ['question'] },
      attributes: ['id', 'answer'],
      where: {
        user_id,
        question_id,
      },
    });
  }

  update(
    user_id: number,
    question_id: number,
    updateUserQuestionDto: UpdateUserQuestionDto,
  ) {
    this.userQuestionModel.update(
      { updateUserQuestionDto },
      {
        where: {
          user_id,
          question_id,
        },
      },
    );
  }

  remove(id: number) {
    return `This action removes a #${id} usersQuestion`;
  }
}
