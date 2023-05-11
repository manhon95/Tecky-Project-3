import { Test, TestingModule } from '@nestjs/testing';
import { UsersQuestionsService } from './users_questions.service';

describe('UsersQuestionsService', () => {
  let service: UsersQuestionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersQuestionsService],
    }).compile();

    service = module.get<UsersQuestionsService>(UsersQuestionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
