import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
} from '~/lib/components/CustomIcons/PublicFacingSite';

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
    link: '',
  },
  {
    icon: TwitterIcon,
    link: '',
  },
  {
    icon: InstagramIcon,
    link: '',
  },
  {
    icon: LinkedInIcon,
    link: '',
  },
];

export { SUPPORT_LINKS, QUICK_LINKS, SOCIAL_LINKS };
