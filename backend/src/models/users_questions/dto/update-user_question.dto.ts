import { PartialType } from '@nestjs/mapped-types';
import { CreateUserQuestionDto } from './create-user_question.dto';

export class UpdateUserQuestionDto extends PartialType(CreateUserQuestionDto) {}
