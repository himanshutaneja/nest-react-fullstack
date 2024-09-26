import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Query } from 'mongoose';
import { User } from './schemas/user.schema';

describe('UserService', () => {
  let service: UserService;
  let mockUserModel: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, {
        provide: getModelToken(User.name),
        useValue: Model,
      }],
    }).compile();

    service = module.get<UserService>(UserService);
    mockUserModel = module.get<Model<User>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return users', async () => {
    const user = new User();
    user.name = "abc"
    const mockResponse = [user];
    jest
      .spyOn(mockUserModel, 'find').mockReturnThis()
      .mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(mockResponse)
      } as unknown as Query<User[], any>)


    const response = await service.getUsers();

    expect(response).toStrictEqual(mockResponse);
  });
});
