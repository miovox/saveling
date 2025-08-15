import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { AuthService, AuthServiceError } from '@/services/auth.service';
import type { FamilyRegistrationRequest, AuthResponse } from '@saveling/shared-types';

const FamilyRegistrationSchema = z.object({
  handle: z.string().min(3).max(50).regex(/^[a-zA-Z0-9_-]+$/, 'Handle can only contain letters, numbers, underscores, and hyphens'),
  displayName: z.string().min(1).max(100),
  password: z.string()
    .min(6, 'Password must be at least 6 characters')
    .max(100)
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const validation = FamilyRegistrationSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid input: ' + validation.error.issues.map(i => i.message).join(', ') 
        } as AuthResponse,
        { status: 400 }
      );
    }

    const familyData: FamilyRegistrationRequest = validation.data;
    
    const authService = AuthService.create();
    const family = await authService.createFamily(familyData);
    
    return NextResponse.json(
      { 
        success: true, 
        family 
      } as AuthResponse,
      { status: 201 }
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
    
    console.error('Family registration error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error' 
      } as AuthResponse,
      { status: 500 }
    );
  }
}