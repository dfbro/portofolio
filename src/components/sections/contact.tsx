'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Send, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Section } from './section-wrapper';
import { useToast } from '@/hooks/use-toast';
import { submitContactForm } from '@/app/actions';
import { contactSchema } from '@/lib/schemas';
import { SOCIAL_LINKS } from '@/lib/data';
import { useTransition } from 'react';

type ContactFormValues = z.infer<typeof contactSchema>;

export function Contact() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const email = process.env.NEXT_PUBLIC_EMAIL || 'alex.doe@email.com';

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  function onSubmit(data: ContactFormValues) {
    startTransition(async () => {
      const result = await submitContactForm(data);
      if (result.success) {
        toast({
          title: 'Message Sent!',
          description: result.message,
        });
        form.reset();
      } else {
        toast({
          title: 'Error',
          description: result.message || 'Something went wrong.',
          variant: 'destructive',
        });
      }
    });
  }

  return (
    <Section id="contact" title="Get In Touch">
      <div className="grid gap-12 md:grid-cols-2">
        <div className="flex flex-col">
          <h3 className="text-2xl font-bold">Contact Me</h3>
          <p className="mt-2 text-muted-foreground">
            Have a project in mind, a question, or just want to say hi? Feel free to reach out. I\'m always open to discussing new opportunities.
          </p>
          <div className="mt-8 space-y-4">
            <a href={`mailto:${email}`} className="flex items-center gap-4 text-muted-foreground transition-colors hover:text-primary">
              <Mail className="h-6 w-6" />
              <span>{email}</span>
            </a>
            {SOCIAL_LINKS.map(social => (
                <a href={social.url} key={social.name} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-muted-foreground transition-colors hover:text-primary">
                    <social.icon className="h-6 w-6" />
                    <span>{social.name}</span>
                </a>
            ))}
          </div>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="your.email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Your message..." {...field} rows={5} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full md:w-auto" disabled={isPending}>
              {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Send className="mr-2 h-4 w-4" />
              )}
              Send Message
            </Button>
          </form>
        </Form>
      </div>
    </Section>
  );
}
