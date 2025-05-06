import { Test } from '@nestjs/testing';
import AuthController from './auth.controller';
import AuthService from './auth.service';

describe('UserController', () => {
  let authService: AuthService;
  let authController: AuthController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();
    userService = moduleRef.get(UserService);
    userController = moduleRef.get(UserController);
  });

  describe('signup', () => {
    it('should create a new user', async () => {
      const user = {
        email: 'W9h6O@example.com',
        fullName: 'Waqar Hussain',
        password: 'admin',
      };
      jest.spyOn(userService, 'signup').mockImplementation(async () => user);
      expect(await userController.signup(user)).toBe(user);
    });
  });
});
