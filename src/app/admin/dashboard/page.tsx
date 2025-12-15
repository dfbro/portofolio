
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { logout } from '@/app/admin/actions';
import Link from 'next/link';

export default function AdminDashboardPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Admin Dashboard</CardTitle>
          <CardDescription>Select a category to manage your portfolio content.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button asChild variant="outline" className="w-full justify-start">
            <Link href="/admin/skills">Manage Skills</Link>
          </Button>
          <Button asChild variant="outline" className="w-full justify-start">
            <Link href="/admin/projects">Manage Projects</Link>
          </Button>
          <Button asChild variant="outline" className="w-full justify-start">
            <Link href="/admin/achievements">Manage Achievements</Link>
          </Button>
          <Button asChild variant="outline" className="w-full justify-start">
            <Link href="/admin/writeups">Manage WriteUps</Link>
          </Button>
          <form action={logout}>
            <Button type="submit" variant="destructive" className="w-full mt-4">
              Log Out
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
