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
    href: '/integrations',
  },
];

const SUPPORT_LINKS = [
  {
    label: 'Help Center',
    href: '/faq',
  },
  {
    label: 'Knowledge Base',
    href: '/knowledge-base',
  },
  {
    label: 'Security',
    href: '/security',
  },
  {
    label: 'Career',
    href: '/career',
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
