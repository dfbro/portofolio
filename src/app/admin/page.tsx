'use client';

import { useActionState, useFormStatus } from 'react-dom';
import { authenticate } from '@/app/admin/actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { KeyRound } from 'lucide-react';

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="w-full" type="submit" aria-disabled={pending}>
      {pending ? 'Authenticating...' : 'Enter'}
    </Button>
  );
}

export default function AdminLoginPage() {
  const [errorMessage, dispatch] = useActionState(authenticate, undefined);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <KeyRound className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Admin Access</CardTitle>
          <CardDescription>
            This area is restricted. Please authenticate to continue.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={dispatch} className="space-y-4">
            <div className="space-y-2">
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="What should I enter?"
                required
                className="text-center"
              />
            </div>
            <LoginButton />
            {errorMessage && (
              <div className="text-center text-sm font-medium text-destructive">
                {errorMessage}
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
