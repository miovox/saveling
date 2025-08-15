import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import type { FamilyRegistrationRequest, FamilyLoginRequest, FamilyResponse } from '@saveling/shared-types';

export class AuthServiceError extends Error {
  constructor(message: string, public code: string, public statusCode: number = 500) {
    super(message);
    this.name = 'AuthServiceError';
  }
}

export class AuthService {
  private prisma: PrismaClient;

  constructor(prismaClient?: PrismaClient) {
    this.prisma = prismaClient || new PrismaClient();
  }
  async createFamily(data: FamilyRegistrationRequest): Promise<FamilyResponse> {
    try {
      // Input sanitization
      const sanitizedData = {
        handle: data.handle.trim().toLowerCase(),
        displayName: data.displayName.trim(),
        password: data.password
      };

      const existingFamily = await this.prisma.family.findUnique({
        where: { handle: sanitizedData.handle }
      });

      if (existingFamily) {
        throw new AuthServiceError('Family handle already exists', 'HANDLE_EXISTS', 409);
      }

      const passwordHash = await bcrypt.hash(sanitizedData.password, 12);

      const family = await this.prisma.family.create({
        data: {
          handle: sanitizedData.handle,
          displayName: sanitizedData.displayName,
          passwordHash
        }
      });

      return {
        id: family.id,
        handle: family.handle,
        displayName: family.displayName,
        createdAt: family.createdAt.toISOString()
      };
    } catch (error) {
      if (error instanceof AuthServiceError) {
        throw error;
      }
      throw new AuthServiceError('Failed to create family', 'CREATE_FAILED', 500);
    }
  }

  async validateFamily(data: FamilyLoginRequest): Promise<FamilyResponse | null> {
    try {
      // Input sanitization
      const sanitizedHandle = data.handle.trim().toLowerCase();

      const family = await this.prisma.family.findUnique({
        where: { handle: sanitizedHandle }
      });

      if (!family) {
        return null;
      }

      const isValidPassword = await bcrypt.compare(data.password, family.passwordHash);
      
      if (!isValidPassword) {
        return null;
      }

      return {
        id: family.id,
        handle: family.handle,
        displayName: family.displayName,
        createdAt: family.createdAt.toISOString()
      };
    } catch (error) {
      throw new AuthServiceError('Failed to validate family', 'VALIDATION_FAILED', 500);
    }
  }

  async getFamilyById(id: string): Promise<FamilyResponse | null> {
    try {
      const family = await this.prisma.family.findUnique({
        where: { id }
      });

      if (!family) {
        return null;
      }

      return {
        id: family.id,
        handle: family.handle,
        displayName: family.displayName,
        createdAt: family.createdAt.toISOString()
      };
    } catch (error) {
      throw new AuthServiceError('Failed to get family', 'GET_FAILED', 500);
    }
  }

  // Static factory method for backward compatibility
  static create(prismaClient?: PrismaClient): AuthService {
    return new AuthService(prismaClient);
  }
}