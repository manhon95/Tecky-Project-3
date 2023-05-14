import {
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Industry } from 'src/models/industries/entities/industry.entity';
import { User } from 'src/models/users/entities/user.entity';
import { UserQuestion } from 'src/models/users_questions/entities/user_question.entity';

@Table({ tableName: 'questions' })
export class Question extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => Industry)
  @Column
  industry_id: number;

  @BelongsTo(() => Industry)
  industry: Industry;

  @Column({ allowNull: false })
  type: string;

  @Column({ allowNull: false })
  question: string;

  @BelongsToMany(() => User, () => UserQuestion)
  users: User[];

  @HasMany(() => UserQuestion)
  userQuestions: UserQuestion[];
}
