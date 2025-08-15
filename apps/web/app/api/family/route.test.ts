import { POST } from './route';
import { AuthService } from '../../../services/auth.service';
import { NextRequest } from 'next/server';

jest.mock('../../../services/auth.service');

const mockAuthService = {
  createFamily: jest.fn(),
};

// Mock the static create method
(AuthService.create as jest.Mock) = jest.fn(() => mockAuthService);

describe('/api/family POST', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create family successfully', async () => {
    const mockFamily = {
      id: 'test-id',
      handle: 'test-family',
      displayName: 'Test Family',
      createdAt: '2023-01-01T00:00:00.000Z',
    };

    mockAuthService.createFamily.mockResolvedValue(mockFamily);

    const request = new NextRequest('http://localhost:3000/api/family', {
      method: 'POST',
      body: JSON.stringify({
        handle: 'test-family',
        displayName: 'Test Family',
        password: 'password123',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.success).toBe(true);
    expect(data.family).toEqual(mockFamily);
  });

  it('should return validation error for invalid input', async () => {
    const request = new NextRequest('http://localhost:3000/api/family', {
      method: 'POST',
      body: JSON.stringify({
        handle: 'ab', // Too short
        displayName: '',
        password: '123', // Too short
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.error).toContain('Invalid input');
  });

  it('should return conflict error for existing handle', async () => {
    mockAuthService.createFamily.mockRejectedValue(
      new Error('Family handle already exists')
    );

    const request = new NextRequest('http://localhost:3000/api/family', {
      method: 'POST',
      body: JSON.stringify({
        handle: 'existing-family',
        displayName: 'Existing Family',
        password: 'password123',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(409);
    expect(data.success).toBe(false);
    expect(data.error).toBe('Family handle already exists');
  });
});