import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: Model,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should return users', async () => {
    const result = [
      { name: 'abc', email: 'abc@test.com', phone: '+61123123123' },
    ];
    jest
      .spyOn(userService, 'getUsers')
      .mockImplementation(() => new Promise((resolve) => resolve(result)));

    const responseMock = {
      status: jest.fn(() => ({
        json: jest.fn((x) => x),
      })),
    } as unknown as Response;

    expect(await controller.getUsers(responseMock)).toBe(result);
  });

  it('should delete user', async () => {
    const result = {
      name: 'abc',
      email: 'abc@test.com',
      phone: '+61123123123',
    };
    jest
      .spyOn(userService, 'deleteUser')
      .mockImplementation(() => new Promise((resolve) => resolve(result)));

    const responseMock = {
      status: jest.fn(() => ({
        json: jest.fn((x) => ({
          message: 'User has been deleted!',
          user: x,
        })),
      })),
    } as unknown as Response;

    const response = await controller.deleteUser(responseMock, 123);
    expect(response.message).toBe('User has been deleted!');
  });

  it('should throw error for invalid delete user id', async () => {
    jest
      .spyOn(userService, 'deleteUser')
      .mockImplementation(() => new Promise((resolve) => resolve(undefined)));

    const responseMock = {
      status: jest.fn(() => ({
        json: jest.fn((x) => ({
          message: 'User has been deleted!',
          user: x,
        })),
      })),
    } as unknown as Response;

    try {
      await controller.deleteUser(responseMock, 123);
    } catch (e) {
      expect(e.message).toBe('User does not exist.');
    }
  });
});
