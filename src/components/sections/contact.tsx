
'use client';

import { useState } from 'react';
import { Mail, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Section } from './section-wrapper';
import { SOCIAL_LINKS } from '@/lib/data';

export function Contact() {
  const email = process.env.NEXT_PUBLIC_EMAIL || 'alex.doe@email.com';
  const portfolioName = process.env.NEXT_PUBLIC_PORTFOLIO_NAME || 'Alex Doe';
  
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [mailOption, setMailOption] = useState('gmail');

  const generateMailLink = () => {
    const subject = encodeURIComponent(`Contact from ${name || 'your portfolio'}`);
    const body = encodeURIComponent(message);
    
    if (mailOption === 'gmail') {
      return `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
    }
    return `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <Section id="contact" title="Get In Touch">
      <div className="grid gap-12 md:grid-cols-2">
        <div className="flex flex-col">
          <h3 className="text-2xl font-bold">Contact Me</h3>
          <p className="mt-2 text-muted-foreground">
            Have a project in mind, a question, or just want to say hi? Feel free to reach out. I&apos;m always open to discussing new opportunities.
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
        
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" placeholder="Your message..." value={message} onChange={(e) => setMessage(e.target.value)} rows={5} />
          </div>

          <div className="space-y-2">
            <Label>Send using</Label>
            <RadioGroup defaultValue="gmail" onValueChange={setMailOption} className="flex items-center gap-4">
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="gmail" id="r-gmail" />
                    <Label htmlFor="r-gmail">Gmail</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="legacy" id="r-legacy" />
                    <Label htmlFor="r-legacy">Legacy (mailto)</Label>
                </div>
            </RadioGroup>
          </div>

          <Button asChild className="w-full md:w-auto">
            <a href={generateMailLink()} target="_blank" rel="noopener noreferrer">
              <Send className="mr-2 h-4 w-4" />
              Open Email Client
            </a>
          </Button>
        </div>
      </div>
    </Section>
  );
}
