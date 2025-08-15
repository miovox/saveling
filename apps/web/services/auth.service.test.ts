import { AuthService } from './auth.service';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

// Mock the entire auth service module
const mockFindUnique = jest.fn();
const mockCreate = jest.fn();

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    family: {
      findUnique: mockFindUnique,
      create: mockCreate,
    },
  })),
}));

jest.mock('bcryptjs');

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    jest.clearAllMocks();
    authService = new AuthService();
  });

  describe('createFamily', () => {
    it('should create a new family successfully', async () => {
      const mockFamily = {
        id: 'test-id',
        handle: 'test-family',
        displayName: 'Test Family',
        passwordHash: 'hashed-password',
        createdAt: new Date('2023-01-01'),
      };

      mockFindUnique.mockResolvedValue(null);
      mockCreate.mockResolvedValue(mockFamily);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-password');

      const result = await authService.createFamily({
        handle: 'test-family',
        displayName: 'Test Family',
        password: 'password123',
      });

      expect(mockFindUnique).toHaveBeenCalledWith({
        where: { handle: 'test-family' },
      });
      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 12);
      expect(result).toEqual({
        id: 'test-id',
        handle: 'test-family',
        displayName: 'Test Family',
        createdAt: '2023-01-01T00:00:00.000Z',
      });
    });

    it('should throw error if family handle already exists', async () => {
      mockFindUnique.mockResolvedValue({ id: 'existing-id' });

      await expect(
        authService.createFamily({
          handle: 'existing-family',
          displayName: 'Existing Family',
          password: 'password123',
        })
      ).rejects.toThrow('Family handle already exists');
    });
  });

  describe('validateFamily', () => {
    it('should validate family credentials successfully', async () => {
      const mockFamily = {
        id: 'test-id',
        handle: 'test-family',
        displayName: 'Test Family',
        passwordHash: 'hashed-password',
        createdAt: new Date('2023-01-01'),
      };

      mockFindUnique.mockResolvedValue(mockFamily);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await authService.validateFamily({
        handle: 'test-family',
        password: 'password123',
      });

      expect(mockFindUnique).toHaveBeenCalledWith({
        where: { handle: 'test-family' },
      });
      expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashed-password');
      expect(result).toEqual({
        id: 'test-id',
        handle: 'test-family',
        displayName: 'Test Family',
        createdAt: '2023-01-01T00:00:00.000Z',
      });
    });

    it('should return null for non-existent family', async () => {
      mockFindUnique.mockResolvedValue(null);

      const result = await authService.validateFamily({
        handle: 'non-existent',
        password: 'password123',
      });

      expect(result).toBeNull();
    });

    it('should return null for invalid password', async () => {
      const mockFamily = {
        id: 'test-id',
        handle: 'test-family',
        passwordHash: 'hashed-password',
      };

      mockFindUnique.mockResolvedValue(mockFamily);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const result = await authService.validateFamily({
        handle: 'test-family',
        password: 'wrong-password',
      });

      expect(result).toBeNull();
    });
  });
});