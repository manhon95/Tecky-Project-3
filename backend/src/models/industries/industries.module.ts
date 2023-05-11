import { Module } from '@nestjs/common';
import { IndustriesService } from './industries.service';
import { IndustriesController } from './industries.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Industry } from './entities/industry.entity';

@Module({
  imports: [SequelizeModule.forFeature([Industry])],
  controllers: [IndustriesController],
  providers: [IndustriesService],
})
export class IndustriesModule {}
