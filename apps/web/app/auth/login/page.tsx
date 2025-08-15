"use client"

import { Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { FamilyLoginForm } from '@/components/auth/FamilyLoginForm';
import type { FamilyLoginRequest } from '@saveling/shared-types';

function LoginPageContent() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const message = searchParams.get('message');
    if (message) {
      setSuccessMessage(message);
    }
  }, [searchParams]);

  const handleLogin = async (data: FamilyLoginRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn('credentials', {
        handle: data.handle,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid family handle or password');
      } else if (result?.ok) {
        router.push('/dashboard');
      } else {
        setError('Login failed. Please try again.');
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
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground mt-2">Sign in to your family account</p>
        </div>
        
        {successMessage && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md text-sm">
            {successMessage}
          </div>
        )}
        
        <FamilyLoginForm
          onSubmit={handleLogin}
          isLoading={isLoading}
          error={error || undefined}
        />
        
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link href="/auth/signup" className="text-primary hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPageContent />
    </Suspense>
  );
}