import {
  GridItem,
  Heading,
  Link,
  Skeleton,
  Text,
  VStack,
} from '@chakra-ui/react';
import { ROUTES } from '~/lib/utils/constants';
import { formatNumberShort } from '~/lib/utils/helperFunctions';

type Card = {
  title: string;
  value?: number;
  color?: string;
  reportId?: number;
};

interface ReportCardProps {
  isLoading?: boolean;
  card: Card;
}

const ReportCard = (props: ReportCardProps) => {
  const { isLoading, card } = props;
  return (
    <GridItem
      bg="white"
      p={{ base: '12px', md: '16px' }}
      borderRadius="md"
      border="1px solid #F2F1F1"
      height="144px"
    >
      <VStack align="start" height="100%" justifyContent="space-between">
        <Skeleton isLoaded={!isLoading} width="full" height="full">
          <VStack align="start" spacing="16px">
            <Text color={card.color ?? '#42403D'} fontWeight={500} size="md">
              {card.title}
            </Text>
            <Heading
              fontSize={{ base: '20px', md: '36px' }}
              lineHeight="38.02px"
              fontWeight={800}
              color={card.color ?? '#0E2642'}
            >
              {card.value && formatNumberShort(card.value)}
            </Heading>
          </VStack>

          <Link
            color="#0366EF"
            fontWeight="500"
            fontSize="12px"
            href={`/${ROUTES.REPORT}/${card.reportId}/detail`}
          >
            View Report
          </Link>
        </Skeleton>
      </VStack>
    </GridItem>
  );
};

export default ReportCard;
