import { Heading, HStack, VStack } from '@chakra-ui/react';
import React from 'react';
import Button from '../../UI/Button';

const LinkData = [
  {
    label: 'Asset Management',
    href: '/asset-management',
  },
  {
    label: 'Maintenance',
    href: '/maintenance',
  },
  {
    label: 'Tasks',
    href: '#',
  },
  {
    label: 'Report',
    href: '#',
  },
];
const QuickLinks = () => {
  return (
    <VStack
      width="full"
      height="full"
      p="16px"
      alignItems="flex-start"
      spacing="24px"
      bgColor="white"
      rounded="8px"
    >
      <Heading
        color="Neutral.800"
        fontSize="16px"
        lineHeight="19.01px"
        fontWeight={700}
      >
        Quick Links:
      </Heading>
      <HStack flexWrap="wrap">
        {LinkData.map((item, index) => (
          <Button
            key={index}
            href={item.href}
            customStyles={{
              color: 'primary.main',
              bgColor: 'neutral.300',
              height: '37px',
              minW: '75px',
              py: '10px',
              px: '12px',
              width: 'min-content',
              _hover: { bgColor: 'none' },
            }}
          >
            {item.label}
          </Button>
        ))}
      </HStack>
    </VStack>
  );
};

export default QuickLinks;
