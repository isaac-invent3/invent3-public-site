import { HStack, VStack } from '@chakra-ui/react';

import { Button } from '@repo/ui/components';
import CardHeader from '../Common/CardHeader';
import { ROUTES } from '~/lib/utils/constants';

const LinkData = [
  {
    label: 'Asset Management',
    href: `/${ROUTES.ASSETS}`,
  },
  {
    label: 'Maintenance',
    href: `/${ROUTES.MAINTENANCE}`,
  },
  {
    label: 'Tasks',
    href: `/${ROUTES.TASKS}`,
  },
  {
    label: 'Report',
    href: `/${ROUTES.REPORT}`,
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
      <CardHeader>Quick Links:</CardHeader>
      <HStack flexWrap="wrap">
        {LinkData.map((item, index) => (
          <Button
            key={index}
            href={item.href}
            customStyles={{
              color: 'primary.500',
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
