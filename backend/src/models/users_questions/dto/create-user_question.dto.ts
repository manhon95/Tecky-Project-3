import { IsNotEmpty, Length } from 'class-validator';

export class CreateUserQuestionDto {
  @IsNotEmpty()
  user_id: number;

  @IsNotEmpty()
  question_id: number;

  @Length(0, 1023)
  answer: string;
}
