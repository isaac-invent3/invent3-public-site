const LINKS = [
  {
    label: 'Solutions',
    href: '/solutions',
  },
  {
    label: 'Sectors',
    href: '/about-us',
    children: {
      submenu: [
        {
          title: 'Banking & Finance',
          link: '/sectors/banking-finance',
          description:
            'Industries Thriving with invent3 pro for smarter and efficient operations',
          icon: '/sector-banking.png',
        },
        {
          title: 'Transporation & Public Infastructure',
          link: '/sectors/transportation-public-infastructure',
          description:
            'Industries Thriving with invent3 pro for smarter and efficient operations',
          icon: '/sector-banking.png',
        },
        {
          title: 'Healthcare & Medical',
          link: '/sectors/healthcare-medical',
          description:
            'Industries Thriving with invent3 pro for smarter and efficient operations',
          icon: '/sector-banking.png',
        },
        {
          title: 'Industrial & Manufacturing',
          link: '/sectors/industrial-manufacturing',
          description:
            'Industries Thriving with invent3 pro for smarter and efficient operations',
          icon: '/sector-conveyor.png',
        },
        {
          title: 'Retail & Warehousing',
          link: '/sectors/retail-warehousing',
          description:
            'Industries Thriving with invent3 pro for smarter and efficient operations',
          icon: '/sector-conveyor.png',
        },
        {
          title: 'Real Estate & Management',
          link: '/sectors/real-estate-management',
          description:
            'Industries Thriving with invent3 pro for smarter and efficient operations',
          icon: '/sector-conveyor.png',
        },
        {
          title: 'Logistics & Fleet Management',
          link: '/sectors/logistics-fleet-management',
          description:
            'Industries Thriving with invent3 pro for smarter and efficient operations',
          icon: '/sector-boat.png',
        },
        {
          title: 'Corporate & Office Spaces',
          link: '/sectors/corporate-office-spaces',
          description:
            'Industries Thriving with invent3 pro for smarter and efficient operations',
          icon: '/sector-boat.png',
        },
      ],
      image: '/sector-preview-image.png',
      columns: 3,
      rowGap: '38px',
    },
  },
  {
    label: 'Our Difference',
    href: '/our-difference',
    children: {
      submenu: [
        {
          title: 'How we Work',
          link: '/how-we-work',
          description:
            'Streamlined tools and support to manage assets with ease',
          icon: '/sector-banking.png',
        },
        {
          title: 'The Invent3.ai Advantage',
          link: '/the-invent3-advantage',
          description:
            'AI-driven insights, seamless control, and unmatched operational visibility',
          icon: '/sector-conveyor.png',
        },
        {
          title: 'Built for All Industries',
          link: '/built-for-all-industries',
          description:
            'Flexible platform designed to serve diverse industries with precision.',
          icon: '/sector-conveyor.png',
        },
      ],
      columns: 1,
      image: '/difference-bg.png',
      rowGap: '24px',
      sectionStyle: {
        width: '219px',
      },
    },
  },
  {
    label: 'Resources',
    href: '/resources',
    children: {
      submenu: [
        {
          title: 'Developer Portal',
          link: '/developer-portal',
          description:
            'Explore tools, APIs, and docs to build with Invent3 easily.',
          icon: '/sector-banking.png',
        },
        {
          title: 'Blog',
          link: '/blog',
          description:
            'Insights, updates, and stories powering smarter asset management decisions',
          icon: '/sector-conveyor.png',
        },
      ],
      columns: 1,
      image: '/resources-bg.png',
      rowGap: '24px',
      sectionStyle: {
        width: '219px',
      },
    },
  },
  {
    label: 'Contact Us',
    href: '/contact-us',
  },
];

export default LINKS;
