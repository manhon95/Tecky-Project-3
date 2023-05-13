import {
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Industry } from 'src/models/industries/entities/industry.entity';
import { Question } from 'src/models/questions/entities/question.entity';
import { Request } from 'src/models/requests/entities/request.entity';
import { Subscription } from 'src/models/subscriptions/entities/subscription.entity';
import { UserQuestion } from 'src/models/users_questions/entities/user_question.entity';

@Table({ tableName: 'users' })
export class User extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ unique: true })
  name: string;

  @Column
  password: string;

  @Column({ unique: true })
  email: string;

  @Column
  role: string;

  @ForeignKey(() => Subscription)
  @Column
  current_subscription_id: number;

  @HasOne(() => Subscription)
  current_subscription: Subscription;

  @ForeignKey(() => Industry)
  @Column
  industry_id: number;

  @BelongsTo(() => Industry)
  industry: Industry;

  @HasMany(() => Subscription)
  subscriptions: Subscription[];

  @HasMany(() => Request)
  requests: Request[];

  @BelongsToMany(() => Question, () => UserQuestion)
  questions: Question[];

  @HasMany(() => UserQuestion)
  userQuestions: UserQuestion[];
}
