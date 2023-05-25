import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { UsersQuestionsService } from './users_questions.service';
import { CreateUserQuestionDto } from './dto/create-user_question.dto';
import { UpdateUserQuestionDto } from './dto/update-user_question.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users-questions')
export class UsersQuestionsController {
  constructor(private readonly usersQuestionsService: UsersQuestionsService) {}

  @Post()
  create(@Body() createUserQuestionDto: CreateUserQuestionDto) {
    return this.usersQuestionsService.create(createUserQuestionDto);
  }

  @Get()
  findAllByUser(@Query('user-id') user_id: string) {
    return this.usersQuestionsService.findAllByUser(+user_id);
  }

  @UseGuards(AuthGuard)
  @Patch()
  update(
    @Query('user-id') user_id: string,
    @Query('question-id') question_id: string,
    @Body() updateUserQuestionDto: UpdateUserQuestionDto,
  ) {
    return this.usersQuestionsService.update(
      +user_id,
      +question_id,
      updateUserQuestionDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersQuestionsService.remove(+id);
  }
}
