'use client';

import { useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { getSkills, updateSkills } from './actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? <Loader2 className="animate-spin" /> : 'Save Changes'}
    </Button>
  );
}

export default function ManageSkillsPage() {
  const [skills, setSkills] = useState<Record<string, string[]>>({});
  const { toast } = useToast();

  const [state, formAction] = useFormState(updateSkills, {
    message: '',
    success: false,
  });

  useEffect(() => {
    getSkills().then(data => {
      if (data) {
        setSkills(data);
      }
    });
  }, []);

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.success ? 'Success' : 'Error',
        description: state.message,
        variant: state.success ? 'default' : 'destructive',
      });
    }
  }, [state, toast]);

  const skillCategories = Object.keys(skills);

  return (
    <div className="container mx-auto py-10">
        <Button asChild variant="outline" className="mb-8">
            <Link href="/admin/dashboard"><ArrowLeft className="mr-2 h-4 w-4"/>Back to Dashboard</Link>
        </Button>

      <Card>
        <CardHeader>
          <CardTitle>Manage Skills</CardTitle>
          <CardDescription>Edit the skill categories and the skills within them. Skills should be comma-separated.</CardDescription>
        </CardHeader>
        <CardContent>
          {Object.keys(skills).length > 0 ? (
            <form action={formAction} className="space-y-6">
               <input type="hidden" name="categories" value={JSON.stringify(skillCategories)} />
              {skillCategories.map(category => (
                <div key={category} className="space-y-2">
                  <Label htmlFor={category} className="text-lg font-semibold">{category}</Label>
                  <Textarea
                    id={category}
                    name={category}
                    defaultValue={skills[category].join(', ')}
                    rows={4}
                    placeholder="e.g., React, Next.js, TypeScript"
                  />
                </div>
              ))}
              <SubmitButton />
            </form>
          ) : (
            <p>Loading skills...</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
