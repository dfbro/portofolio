
'use client';

import { useEffect, useState, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { updateWriteups } from './actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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

type Writeup = {
  id: string;
  event: string;
  rank: string;
  date: string;
  writeupUrl: string;
  imageUrl: string;
};

export default function ManageWriteupsPage() {
  const [writeups, setWriteups] = useState<Writeup[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const [state, formAction] = useActionState(updateWriteups, {
    message: '',
    success: false,
  });

  const fetchAndSetData = async () => {
    try {
        setLoading(true);
        const response = await fetch('/api/writeups');
        const data = await response.json();
        const formattedData = data.map((item: any) => ({
            ...item,
            imageUrl: item.imageUrl ?? '',
            writeupUrl: item.writeupUrl ?? '',
        }))
        setWriteups(formattedData);
    } catch (error) {
        console.error("Failed to fetch writeups", error);
        toast({
            title: "Error",
            description: "Could not load write-ups data.",
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
    const newId = `writeup_${Date.now()}`;
    setWriteups([...writeups, { id: newId, event: '', rank: '', date: '', writeupUrl: '', imageUrl: '' }]);
  };

  const handleRemove = (id: string) => {
    setWriteups(writeups.filter(p => p.id !== id));
  };
  
  const handleChange = (id: string, field: keyof Omit<Writeup, 'id'>, value: string) => {
    setWriteups(writeups.map(p => (p.id === id ? { ...p, [field]: value } : p)));
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
          <CardTitle>Manage Write-Ups</CardTitle>
          <CardDescription>
            Edit, add, or remove CTF write-ups.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
             <div className="flex justify-center items-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
             </div>
          ) : (
            <form action={formAction} className="space-y-8">
              <input type="hidden" name="writeupsData" value={JSON.stringify(writeups)} />
              
              {writeups.map(item => (
                <div key={item.id} className="space-y-4 rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                     <h3 className="text-lg font-semibold">Write-Up ID: {item.id}</h3>
                    <Button variant="ghost" size="icon" onClick={() => handleRemove(item.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                      <span className="sr-only">Remove Write-Up</span>
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Event</Label>
                    <Input value={item.event} onChange={(e) => handleChange(item.id, 'event', e.target.value)} placeholder="CTF Event Name" />
                    <Label>Rank</Label>
                    <Input value={item.rank} onChange={(e) => handleChange(item.id, 'rank', e.target.value)} placeholder="e.g., Top 5% or 1st Place" />
                    <Label>Date</Label>
                    <Input value={item.date} onChange={(e) => handleChange(item.id, 'date', e.target.value)} placeholder="e.g., Oct 2023" />
                    <Label>Write-Up URL</Label>
                    <Input 
                      type="url"
                      required
                      value={item.writeupUrl} 
                      onChange={(e) => handleChange(item.id, 'writeupUrl', e.target.value)} 
                      placeholder="https://example.com/writeup" 
                    />
                    <Label>Image URL (optional)</Label>
                    <Input value={item.imageUrl} onChange={(e) => handleChange(item.id, 'imageUrl', e.target.value)} placeholder="https://images.unsplash.com/photo-1.jpg" />
                  </div>
                </div>
              ))}
              
              <div className="flex flex-col md:flex-row gap-4">
                <Button type="button" variant="outline" onClick={handleAdd}>
                  <Plus className="mr-2 h-4 w-4" /> Add New Write-Up
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
