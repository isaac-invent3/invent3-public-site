import { SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import TitleSubtitleCard from '../../Common/TitleSubtitleCard';

const content = [
  {
    title: 'Seamless Integration',
    subtitle:
      'Invent3Pro works effortlessly with ERP, CRM, and financial tools to ensure a connected workflow.',
  },
  {
    title: 'User-Centric Design',
    subtitle:
      'Our platform is built for ease of use, ensuring teams can adapt quickly and drive impact.',
  },
  {
    title: 'Scalability & Flexibility',
    subtitle:
      "Whether you're managing hundreds or millions of assets, our platform grows with your needs.",
  },
  {
    title: 'Security & Compliance',
    subtitle:
      'We prioritize data security, industry regulations, and enterprise-grade protection.',
  },
  {
    title: 'AI-First Innovation',
    subtitle:
      'We leverage cutting-edge AI to automate asset tracking, predictive maintenance, and compliance monitoring.',
  },
];

const StrategyPoints = () => {
  return (
    <SimpleGrid
      columns={{ base: 1, sm: 2, lg: 3 }}
      columnGap={{ base: '16px', lg: '32px' }}
      rowGap={{ base: '32px', lg: '44px' }}
    >
      {content.map((item, index) => (
        <TitleSubtitleCard
          {...item}
          key={index}
          titleStyles={{ color: 'white' }}
          subtitleStyles={{
            color: 'primary.accent',
            fontSize: { base: '14px', lg: '16px' },
            lineHeight: { base: '18px', lg: '100%' },
          }}
        />
      ))}
    </SimpleGrid>
  );
};

export default StrategyPoints;
