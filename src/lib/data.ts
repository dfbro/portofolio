import {
  Code,
  Github,
  Linkedin,
  LucideIcon,
  Twitter,
  FileText,
  Globe,
} from 'lucide-react';
import data from './placeholder-images.json';

const PlaceHolderImages = data.placeholderImages;

export const NAV_LINKS = [
  { name: 'Home', href: '/#home' },
  { name: 'Projects', href: '/projects' },
  { name: 'Skills', href: '/skills' },
  { name: 'CTF', href: '/ctf' },
  { name: 'Blog', href: '/blog' },
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

export const PROJECTS = [
  {
    title: 'E-commerce Platform',
    description: 'A full-stack e-commerce solution with a custom CMS and payment gateway integration.',
    techStack: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL', 'Tailwind CSS'],
    liveUrl: '#',
    repoUrl: '#',
    image: findImage('project-1'),
  },
  {
    title: 'SaaS Dashboard',
    description: 'A responsive dashboard for a SaaS application, featuring data visualization and user management.',
    techStack: ['React', 'Vite', 'Recharts', 'Zustand', 'Firebase'],
    liveUrl: '#',
    repoUrl: '#',
    image: findImage('project-2'),
  },
  {
    title: 'Portfolio API',
    description: 'A headless GraphQL API to power this portfolio, built with Node.js and Apollo Server.',
    techStack: ['Node.js', 'GraphQL', 'Apollo Server', 'Docker'],
    liveUrl: '#',
    repoUrl: '#',
    image: findImage('project-3'),
  },
  {
    title: 'Another Project',
    description: 'This is another great project to showcase.',
    techStack: ['SvelteKit', 'Tailwind CSS', 'PocketBase'],
    liveUrl: '#',
    repoUrl: '#',
    image: findImage('project-2'),
  },
];

export const CTF_ACHIEVEMENTS = [
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

export const SKILLS: Record<string, string[]> = {
    'Web Development': ['React', 'Next.js', 'TypeScript', 'Node.js', 'GraphQL', 'PostgreSQL', 'Docker', 'Tailwind CSS'],
    'Cybersecurity': ['Reverse Engineering', 'Web Exploitation', 'Forensics', 'Cryptography', 'Wireshark', 'Metasploit', 'Burp Suite', 'Ghidra']
};

export const BLOG_POSTS = [
    {
        title: "Mastering XSS: From Basics to Advanced",
        description: "A deep dive into Cross-Site Scripting vulnerabilities, including mitigation techniques.",
        link: "#",
        image: findImage('blog-1'),
    },
    {
        title: "Why I Chose Next.js for My Portfolio",
        description: "An overview of the benefits of using Next.js for building modern, performant web applications.",
        link: "#",
        image: findImage('blog-2'),
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
