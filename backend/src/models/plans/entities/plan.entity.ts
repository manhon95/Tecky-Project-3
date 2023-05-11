import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Subscription } from 'src/models/subscriptions/entities/subscription.entity';

@Table
export class Plan extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ unique: true, allowNull: false })
  name: string;

  @Column({ allowNull: false })
  price: string;

  @HasMany(() => Subscription)
  subscriptions: Subscription[];
}
