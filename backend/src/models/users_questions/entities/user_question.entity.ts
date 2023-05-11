import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Question } from 'src/models/questions/entities/question.entity';
import { User } from 'src/models/users/entities/user.entity';

@Table
export class UserQuestion extends Model {
  @ForeignKey(() => User)
  @Column
  user_id: number;

  @ForeignKey(() => Question)
  @Column
  question_id: number;

  @Column
  answer: string;

  @Column
  enable: boolean;
}
