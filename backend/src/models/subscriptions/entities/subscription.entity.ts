import {
  BelongsTo,
  Column,
  ForeignKey,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Plan } from 'src/models/plans/entities/plan.entity';
import { User } from 'src/models/users/entities/user.entity';

@Table({ tableName: 'subscriptions' })
export class Subscription extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => User)
  @Column
  user_id: number;

  @HasOne(() => User)
  user: User;

  @ForeignKey(() => Plan)
  @Column
  plan_id: number;

  @BelongsTo(() => Plan)
  plan: Plan;

  @Column
  from_time: number;

  @Column
  to_time: number;

  @BelongsTo(() => User)
  current_user: User;
}
