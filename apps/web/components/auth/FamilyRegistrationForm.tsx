"use client"

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const registrationSchema = z.object({
  handle: z.string()
    .min(3, 'Handle must be at least 3 characters')
    .max(50, 'Handle must be less than 50 characters')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Handle can only contain letters, numbers, underscores, and hyphens')
    .transform(val => val.trim().toLowerCase()),
  displayName: z.string()
    .min(1, 'Display name is required')
    .max(100, 'Display name must be less than 100 characters')
    .transform(val => val.trim()),
  password: z.string()
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password must be less than 100 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

interface FamilyRegistrationFormProps {
  onSubmit: (data: Omit<RegistrationFormData, 'confirmPassword'>) => Promise<void>;
  isLoading?: boolean;
  error?: string;
}

export function FamilyRegistrationForm({ onSubmit, isLoading = false, error }: FamilyRegistrationFormProps) {
  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      handle: '',
      displayName: '',
      password: '',
      confirmPassword: ''
    }
  });

  const handleSubmit = async (data: RegistrationFormData) => {
    const { confirmPassword, ...registrationData } = data;
    await onSubmit(registrationData);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create Family Account</CardTitle>
        <CardDescription>
          Set up your family&apos;s secure financial space
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="handle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Family Handle</FormLabel>
                  <FormControl>
                    <Input placeholder="your-family-name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Name</FormLabel>
                  <FormControl>
                    <Input placeholder="The Smith Family" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}