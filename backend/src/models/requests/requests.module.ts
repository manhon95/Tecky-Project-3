import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Request } from './entities/request.entity';

@Module({
  imports: [SequelizeModule.forFeature([Request])],
  controllers: [RequestsController],
  providers: [RequestsService],
})
export class RequestsModule {}
