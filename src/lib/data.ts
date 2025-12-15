import {
  Code,
  Github,
  Linkedin,
  LucideIcon,
  Twitter,
  FileText,
  Globe,
} from 'lucide-react';
import placeholderData from './placeholder-images.json';

const PlaceHolderImages = placeholderData.placeholderImages;

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

const findImage = (id: string) => PlaceHolderImages.find(img => img.id === id);

export const ACHIEVEMENTS = [
  {
    title: 'Google Cloud Certified',
    description: 'Associate Cloud Engineer',
    organization: 'Google',
    date: '2023',
    url: '#',
    image: findImage('achievement-1'),
  },
  {
    title: 'Certified Kubernetes Administrator',
    description: 'CKA Certification',
    organization: 'The Linux Foundation',
    date: '2022',
    url: '#',
    image: findImage('achievement-2'),
  },
  {
    title: 'AWS Certified Solutions Architect',
    description: 'Associate',
    organization: 'Amazon Web Services',
    date: '2021',
    url: '#',
    image: findImage('achievement-3'),
  },
  {
    title: 'Security+ Certified',
    description: 'CompTIA Security+ Certification',
    organization: 'CompTIA',
    date: '2020',
    url: '#',
    image: findImage('achievement-1'),
  },
];

export const CTF_WRITEUPS = [
    {
        event: "HackTheBox University CTF 2023",
        rank: "Top 5%",
        date: "Oct 2023",
        writeupUrl: "#",
        image: findImage('ctf-1'),
    },
    {
        event: "DEF CON CTF Quals",
        rank: "Participant",
        date: "May 2023",
        writeupUrl: "#",
        image: findImage('ctf-2'),
    },
    {
        event: "Another CTF",
        rank: "1st Place",
        date: "Jan 2023",
        writeupUrl: "#",
        image: findImage('ctf-1'),
    }
];

export const ICONS = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
    fileText: FileText,
    globe: Globe,
    code: Code,
};
