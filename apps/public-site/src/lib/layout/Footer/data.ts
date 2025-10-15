import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
} from '@/lib/components/CustomIcons';

const QUICK_LINKS = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'About Us',
    href: '/about-us',
  },
  {
    label: 'Solutions',
    href: '/solutions',
  },
  {
    label: 'Features',
    href: '/features',
  },
  {
    label: 'Integrations',
    href: '#',
  },
];

const SUPPORT_LINKS = [
  {
    label: 'Help Center',
    href: '#',
  },
  {
    label: 'Knowledge Base',
    href: '#',
  },
  {
    label: 'Security',
    href: '#',
  },
  {
    label: 'Career',
    href: '#',
  },
];

const SOCIAL_LINKS = [
  {
    icon: FacebookIcon,
    link: 'https://www.facebook.com/share/15FGWwDZ193/?mibextid=wwXIfr',
  },
  {
    icon: TwitterIcon,
    link: 'https://x.com/invent3ai?s=21',
  },
  {
    icon: InstagramIcon,
    link: 'https://www.instagram.com/invent3.ai?igsh=MTBmbHNyaTRtdGRoNA==',
  },
  {
    icon: LinkedInIcon,
    link: 'https://www.linkedin.com/company/invent3/',
  },
];

export { SUPPORT_LINKS, QUICK_LINKS, SOCIAL_LINKS };
