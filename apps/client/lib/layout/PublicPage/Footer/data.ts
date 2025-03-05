import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
} from '~/lib/components/CustomIcons/PublicFacingSite';

const COMPANY_LINK = [
  {
    label: 'About Us',
    href: '/about-us',
  },
  {
    label: 'Product',
    href: '/product',
  },
  {
    label: 'Resources',
    href: '/resources',
  },
  {
    label: 'FAQ',
    href: '/faq',
  },
  {
    label: 'Contact Us',
    href: '/contact-us',
  },
];

const LEARN_LINK = [
  {
    label: 'E-Books',
    href: '/e-books',
  },
  {
    label: 'Blog',
    href: '/blog',
  },
  {
    label: 'Guide',
    href: '/guide',
  },
  {
    label: 'Templates',
    href: '/templates',
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

export { LEARN_LINK, COMPANY_LINK, SOCIAL_LINKS };
