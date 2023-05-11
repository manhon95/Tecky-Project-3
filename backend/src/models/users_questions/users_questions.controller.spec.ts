import { Test, TestingModule } from '@nestjs/testing';
import { UsersQuestionsController } from './users_questions.controller';
import { UsersQuestionsService } from './users_questions.service';

describe('UsersQuestionsController', () => {
  let controller: UsersQuestionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersQuestionsController],
      providers: [UsersQuestionsService],
    }).compile();

    controller = module.get<UsersQuestionsController>(UsersQuestionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
