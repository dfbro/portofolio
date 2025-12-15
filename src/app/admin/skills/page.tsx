'use client';

import { useEffect, useState, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { getSkills, updateSkills } from './actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { ArrowLeft, Loader2, Plus, Trash2 } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto">
      {pending ? <Loader2 className="animate-spin" /> : 'Save All Changes'}
    </Button>
  );
}

type SkillCategory = {
  id: number;
  category: string;
  skills: string;
};

export default function ManageSkillsPage() {
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
  const [nextId, setNextId] = useState(0);
  const { toast } = useToast();

  const [state, formAction] = useActionState(updateSkills, {
    message: '',
    success: false,
  });

  useEffect(() => {
    getSkills().then(data => {
      if (data) {
        const formattedSkills = Object.entries(data).map(([category, skills], index) => ({
          id: index,
          category,
          skills: skills.join(', '),
        }));
        setSkillCategories(formattedSkills);
        setNextId(formattedSkills.length);
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
      if(state.success) {
        getSkills().then(data => {
            if (data) {
                const formattedSkills = Object.entries(data).map(([category, skills], index) => ({
                id: index,
                category,
                skills: skills.join(', '),
                }));
                setSkillCategories(formattedSkills);
                setNextId(formattedSkills.length);
            }
        });
      }
    }
  }, [state, toast]);

  const handleAddCategory = () => {
    setSkillCategories([...skillCategories, { id: nextId, category: '', skills: '' }]);
    setNextId(nextId + 1);
  };

  const handleRemoveCategory = (id: number) => {
    setSkillCategories(skillCategories.filter(cat => cat.id !== id));
  };

  const handleCategoryChange = (id: number, newCategoryName: string) => {
    const updatedCategories = skillCategories.map(cat =>
      cat.id === id ? { ...cat, category: newCategoryName } : cat
    );
    setSkillCategories(updatedCategories);
  };

  const handleSkillsChange = (id: number, newSkills: string) => {
    const updatedCategories = skillCategories.map(cat =>
      cat.id === id ? { ...cat, skills: newSkills } : cat
    );
    setSkillCategories(updatedCategories);
  };

  return (
    <div className="container mx-auto py-10">
      <Button asChild variant="outline" className="mb-8">
        <Link href="/admin/dashboard">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Manage Skills</CardTitle>
          <CardDescription>
            Edit, add, or remove skill categories. Skills should be comma-separated.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-8">
            <input type="hidden" name="skillsData" value={JSON.stringify(skillCategories.map(({ id, ...rest }) => rest))} />
            {skillCategories.map(({ id, category, skills }) => (
              <div key={id} className="space-y-3 rounded-lg border p-4">
                <div className="flex items-center justify-between">
                    <Label htmlFor={`category-${id}`} className="text-lg font-semibold">
                    Category Name
                    </Label>
                    <Button variant="ghost" size="icon" onClick={() => handleRemoveCategory(id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                        <span className="sr-only">Remove Category</span>
                    </Button>
                </div>
                <Input
                  id={`category-${id}`}
                  name={`category-${id}`}
                  value={category}
                  onChange={(e) => handleCategoryChange(id, e.target.value)}
                  placeholder="e.g., Web Development"
                  className="text-base"
                />

                <Label htmlFor={`skills-${id}`} className="text-md font-medium">
                  Skills (comma-separated)
                </Label>
                <Textarea
                  id={`skills-${id}`}
                  name={`skills-${id}`}
                  value={skills}
                  onChange={(e) => handleSkillsChange(id, e.target.value)}
                  rows={4}
                  placeholder="e.g., React, Next.js, TypeScript"
                />
              </div>
            ))}
            
            <div className="flex flex-col md:flex-row gap-4">
                <Button type="button" variant="outline" onClick={handleAddCategory}>
                    <Plus className="mr-2 h-4 w-4" /> Add New Category
                </Button>
                <SubmitButton />
            </div>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}
