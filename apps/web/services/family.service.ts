import type { 
  FamilyRegistrationRequest, 
  FamilyLoginRequest, 
  AuthResponse 
} from '@saveling/shared-types';

export class FamilyService {
  private static readonly BASE_URL = '/api';

  static async registerFamily(data: FamilyRegistrationRequest): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.BASE_URL}/family`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        // Preserve server error details
        throw new Error(result.error || `HTTP error! status: ${response.status}`);
      }

      return result;
    } catch (error) {
      console.error('Family registration error:', error);
      // Re-throw with original message if available
      throw error instanceof Error ? error : new Error('Failed to register family');
    }
  }

  static async loginFamily(data: FamilyLoginRequest): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        // Preserve server error details
        throw new Error(result.error || `HTTP error! status: ${response.status}`);
      }

      return result;
    } catch (error) {
      console.error('Family login error:', error);
      // Re-throw with original message if available
      throw error instanceof Error ? error : new Error('Failed to login family');
    }
  }
}