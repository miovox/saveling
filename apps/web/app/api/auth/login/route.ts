import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { AuthService, AuthServiceError } from '@/services/auth.service';
import type { FamilyLoginRequest, AuthResponse } from '@saveling/shared-types';

const LoginSchema = z.object({
  handle: z.string().min(1, 'Handle is required'),
  password: z.string().min(1, 'Password is required')
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const validation = LoginSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid input: ' + validation.error.issues.map(i => i.message).join(', ') 
        } as AuthResponse,
        { status: 400 }
      );
    }

    const loginData: FamilyLoginRequest = validation.data;
    
    const authService = AuthService.create();
    const family = await authService.validateFamily(loginData);
    
    if (!family) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid family handle or password' 
        } as AuthResponse,
        { status: 401 }
      );
    }
    
    return NextResponse.json(
      { 
        success: true, 
        family 
      } as AuthResponse,
      { status: 200 }
    );
    
  } catch (error: any) {
    if (error instanceof AuthServiceError) {
      return NextResponse.json(
        { 
          success: false, 
          error: error.message 
        } as AuthResponse,
        { status: error.statusCode }
      );
    }
    
    console.error('Login error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error' 
      } as AuthResponse,
      { status: 500 }
    );
  }
}