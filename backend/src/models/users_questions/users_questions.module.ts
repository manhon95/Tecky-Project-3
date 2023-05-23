import { Module } from '@nestjs/common';
import { UsersQuestionsService } from './users_questions.service';
import { UsersQuestionsController } from './users_questions.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserQuestion } from './entities/user_question.entity';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [SequelizeModule.forFeature([UserQuestion]), AuthService],
  controllers: [UsersQuestionsController],
  providers: [UsersQuestionsService],
})
export class UsersQuestionsModule {}
