import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersQuestionsService } from './users_questions.service';
import { CreateUserQuestionDto } from './dto/create-user_question.dto';
import { UpdateUserQuestionDto } from './dto/update-user_question.dto';

@Controller('users-questions')
export class UsersQuestionsController {
  constructor(private readonly usersQuestionsService: UsersQuestionsService) {}

  @Post()
  create(@Body() createUserQuestionDto: CreateUserQuestionDto) {
    return this.usersQuestionsService.create(createUserQuestionDto);
  }

  @Get()
  findAll() {
    return this.usersQuestionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersQuestionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserQuestionDto: UpdateUserQuestionDto,
  ) {
    return this.usersQuestionsService.update(+id, updateUserQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersQuestionsService.remove(+id);
  }
}
