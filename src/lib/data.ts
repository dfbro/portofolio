
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

export const ICONS = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
    fileText: FileText,
    globe: Globe,
    code: Code,
    trophy: Trophy
};
