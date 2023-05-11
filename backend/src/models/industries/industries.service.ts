import { Injectable } from '@nestjs/common';
import { Industry } from './entities/industry.entity';
import { CreateIndustryDto } from './dto/create-industry.dto';
import { UpdateIndustryDto } from './dto/update-industry.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class IndustriesService {
  constructor(
    @InjectModel(Industry)
    private industryModel: typeof Industry,
  ) {}

  create(createIndustryDto: CreateIndustryDto) {
    return 'This action adds a new industry';
  }

  findAll() {
    return `This action returns all industries`;
  }

  findOne(id: number) {
    return `This action returns a #${id} industry`;
  }

  update(id: number, updateIndustryDto: UpdateIndustryDto) {
    return `This action updates a #${id} industry`;
  }

  remove(id: number) {
    return `This action removes a #${id} industry`;
  }
}
