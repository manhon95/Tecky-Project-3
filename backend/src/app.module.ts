import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './models/users/users.module';
import { User } from './models/users/entities/user.entity';
import { Industry } from './models/industries/entities/industry.entity';
import { Request } from './models/requests/entities/request.entity';
import { Plan } from './models/plans/entities/plan.entity';
import { Question } from './models/questions/entities/question.entity';
import { UserQuestion } from './models/users_questions/entities/user_question.entity';
import { Subscription } from './models/subscriptions/entities/subscription.entity';
import { IndustriesModule } from './models/industries/industries.module';
import { RequestsModule } from './models/requests/requests.module';
import { PlansModule } from './models/plans/plans.module';
import { QuestionsModule } from './models/questions/questions.module';
import { UsersQuestionsModule } from './models/users_questions/users_questions.module';
import { SubscriptionsModule } from './models/subscriptions/subscriptions.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.env.DATABASE_NAME,
      models: [
        User,
        Industry,
        Request,
        Plan,
        Question,
        UserQuestion,
        Subscription,
      ],
      synchronize: false,
    }),
    UsersModule,
    IndustriesModule,
    RequestsModule,
    PlansModule,
    QuestionsModule,
    UsersQuestionsModule,
    SubscriptionsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
