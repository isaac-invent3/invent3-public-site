import {
  Heading,
  HStack,
  Icon,
  Text,
  useMediaQuery,
  VStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { ReportIcon } from '../../CustomIcons';

interface PredictiveCardProps {
  title: string;
  description: string;
  route: string;
}

const PredictiveCard = (props: PredictiveCardProps) => {
  const { title, description, route } = props;
  const [isMobile] = useMediaQuery('(max-width: 480px)');
  return (
    <Link href={`${route}`} style={{ width: isMobile ? '100%' : '200px' }}>
      <VStack
        rounded="8px"
        bgColor="white"
        p="12px"
        width={{ base: 'full', sm: '200px' }}
        spacing="8px"
        minH="108px"
        alignItems="flex-start"
      >
        <HStack width="full" justifyContent="space-between" spacing="8px">
          <Heading
            fontSize="14px"
            color="primary.500"
            fontWeight={700}
            lineHeight="100%"
          >
            {title}
          </Heading>
          <Icon as={ReportIcon} boxSize="24px" />
        </HStack>
        <Text color="neutral.600">{description}</Text>
      </VStack>
    </Link>
  );
};

export default PredictiveCard;
