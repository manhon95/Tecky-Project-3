import { Module } from '@nestjs/common';
import { UsersQuestionsService } from './users_questions.service';
import { UsersQuestionsController } from './users_questions.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserQuestion } from './entities/user_question.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  imports: [SequelizeModule.forFeature([UserQuestion]), AuthGuard],
  controllers: [UsersQuestionsController],
  providers: [UsersQuestionsService],
})
export class UsersQuestionsModule {}
