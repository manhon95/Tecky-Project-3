import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/models/users/entities/user.entity';

@Table
export class Request extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => User)
  @Column({ allowNull: false })
  user_id: number;

  @BelongsTo(() => User)
  user: User;

  @Column({ allowNull: false })
  from_time: number;

  @Column({ allowNull: false })
  to_time: number;
}
