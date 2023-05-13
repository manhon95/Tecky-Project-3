import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Question } from 'src/models/questions/entities/question.entity';
import { User } from 'src/models/users/entities/user.entity';

@Table
@Table({ tableName: 'users_questions' })
export class UserQuestion extends Model {
  @ForeignKey(() => User)
  @Column
  user_id: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Question)
  @Column
  question_id: number;

  @BelongsTo(() => Question)
  question: Question;

  @Column
  answer: string;

  @Column
  enable: boolean;
}
