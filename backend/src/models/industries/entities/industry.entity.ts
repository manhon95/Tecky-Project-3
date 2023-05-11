import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Question } from 'src/models/questions/entities/question.entity';
import { User } from 'src/models/users/entities/user.entity';

@Table
export class Industry extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ unique: true, allowNull: false })
  name: string;

  @HasMany(() => User)
  users: User[];

  @HasMany(() => Question)
  questions: Question[];
}
