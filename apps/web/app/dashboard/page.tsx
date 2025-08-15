import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect('/auth/login');
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Welcome, {session.user?.name}!</h1>
          <p className="text-muted-foreground mt-2">
            Family Handle: {(session.user as any)?.handle}
          </p>
        </div>
        
        <div className="bg-card rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
          <p className="text-muted-foreground">
            Your family finance dashboard is ready! This is where you&apos;ll manage your family&apos;s financial data.
          </p>
        </div>
      </div>
    </div>
  );
}