import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 max-w-md px-4">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Saveling</h1>
          <p className="text-lg text-muted-foreground">
            Simple and secure family finance management
          </p>
        </div>
        
        <div className="space-y-3">
          <Link href="/auth/signup" className="block">
            <Button className="w-full" size="lg">
              Create Family Account
            </Button>
          </Link>
          
          <Link href="/auth/login" className="block">
            <Button variant="outline" className="w-full" size="lg">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}