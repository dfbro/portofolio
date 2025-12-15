import {
  Code,
  Github,
  Linkedin,
  LucideIcon,
  Twitter,
  FileText,
  Globe,
  Trophy
} from 'lucide-react';
import placeholderData from './placeholder-images.json';

export const PlaceHolderImages = placeholderData.placeholderImages;

export const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '/projects' },
  { name: 'Skills', href: '/#skills' },
  { name: 'Achievements', href: '/achievements' },
  { name: 'WriteUps', href: '/ctf' },
  { name: 'Contact', href: '/#contact' },
];

export const SOCIAL_LINKS: { name: string; url: string; icon: LucideIcon }[] = [
  {
    name: 'GitHub',
    url: process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com',
    icon: Github,
  },
  {
    name: 'LinkedIn',
    url: process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://linkedin.com',
    icon: Linkedin,
  },
  {
    name: 'Twitter',
    url: process.env.NEXT_PUBLIC_TWITTER_URL || 'https://twitter.com',
    icon: Twitter,
  },
];

export const CTF_WRITEUPS = [
    {
        event: "HackTheBox University CTF 2023",
        rank: "Top 5%",
        date: "Oct 2023",
        writeupUrl: "#",
        image: PlaceHolderImages.find(img => img.id === 'ctf-1'),
    },
    {
        event: "DEF CON CTF Quals",
        rank: "Participant",
        date: "May 2023",
        writeupUrl: "#",
        image: PlaceHolderImages.find(img => img.id === 'ctf-2'),
    },
    {
        event: "Another CTF",
        rank: "1st Place",
        date: "Jan 2023",
        writeupUrl: "#",
        image: PlaceHolderImages.find(img => img.id === 'ctf-1'),
    }
];

export const ICONS = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
    fileText: FileText,
    globe: Globe,
    code: Code,
    trophy: Trophy
};
