'use client';

import { useEffect, useState, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { updateAchievements } from './actions';
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

type Achievement = {
  id: string;
  title: string;
  description: string;
  organization: string;
  date: string;
  url: string;
  imageUrl: string;
};

export default function ManageAchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const [state, formAction] = useActionState(updateAchievements, {
    message: '',
    success: false,
  });

  const fetchAndSetData = async () => {
    try {
        setLoading(true);
        const response = await fetch('/api/achievements');
        const data = await response.json();
        const formattedData = data.map((item: any) => ({
            ...item,
            imageUrl: item.imageUrl ?? ''
        }))
        setAchievements(formattedData);
    } catch (error) {
        console.error("Failed to fetch achievements", error);
        toast({
            title: "Error",
            description: "Could not load achievements data.",
            variant: "destructive"
        })
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchAndSetData();
  }, []);

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.success ? 'Success' : 'Error',
        description: state.message,
        variant: state.success ? 'default' : 'destructive',
      });
      if (state.success) {
        fetchAndSetData();
      }
    }
  }, [state, toast]);

  const handleAdd = () => {
    const newId = `achieve_${Date.now()}`;
    setAchievements([...achievements, { id: newId, title: '', description: '', organization: '', date: '', url: '', imageUrl: '' }]);
  };

  const handleRemove = (id: string) => {
    setAchievements(achievements.filter(p => p.id !== id));
  };
  
  const handleChange = (id: string, field: keyof Omit<Achievement, 'id'>, value: string) => {
    setAchievements(achievements.map(p => (p.id === id ? { ...p, [field]: value } : p)));
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
          <CardTitle>Manage Achievements</CardTitle>
          <CardDescription>
            Edit, add, or remove achievements.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
             <div className="flex justify-center items-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
             </div>
          ) : (
            <form action={formAction} className="space-y-8">
              <input type="hidden" name="achievementsData" value={JSON.stringify(achievements)} />
              
              {achievements.map(item => (
                <div key={item.id} className="space-y-4 rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                     <h3 className="text-lg font-semibold">Achievement ID: {item.id}</h3>
                    <Button variant="ghost" size="icon" onClick={() => handleRemove(item.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                      <span className="sr-only">Remove Achievement</span>
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input value={item.title} onChange={(e) => handleChange(item.id, 'title', e.target.value)} placeholder="Achievement Title" />
                    <Label>Description</Label>
                    <Textarea value={item.description} onChange={(e) => handleChange(item.id, 'description', e.target.value)} placeholder="Short description..." />
                    <Label>Organization</Label>
                    <Input value={item.organization} onChange={(e) => handleChange(item.id, 'organization', e.target.value)} placeholder="e.g., Google" />
                    <Label>Date</Label>
                    <Input value={item.date} onChange={(e) => handleChange(item.id, 'date', e.target.value)} placeholder="e.g., 2023" />
                    <Label>Certificate URL</Label>
                    <Input value={item.url} onChange={(e) => handleChange(item.id, 'url', e.target.value)} placeholder="https://example.com/certificate.pdf" />
                    <Label>Image URL (optional)</Label>
                    <Input value={item.imageUrl} onChange={(e) => handleChange(item.id, 'imageUrl', e.target.value)} placeholder="https://images.unsplash.com/photo-1.jpg" />
                  </div>
                </div>
              ))}
              
              <div className="flex flex-col md:flex-row gap-4">
                <Button type="button" variant="outline" onClick={handleAdd}>
                  <Plus className="mr-2 h-4 w-4" /> Add New Achievement
                </Button>
                <SubmitButton />
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
