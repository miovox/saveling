"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FamilyRegistrationForm } from '@/components/auth/FamilyRegistrationForm';
import type { FamilyRegistrationRequest } from '@saveling/shared-types';

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleRegistration = async (data: FamilyRegistrationRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/family', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        router.push('/auth/login?message=Account created successfully');
      } else {
        setError(result.error || 'Registration failed');
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Welcome to Saveling</h1>
          <p className="text-muted-foreground mt-2">Create your family account to get started</p>
        </div>
        
        <FamilyRegistrationForm
          onSubmit={handleRegistration}
          isLoading={isLoading}
          error={error || undefined}
        />
        
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}