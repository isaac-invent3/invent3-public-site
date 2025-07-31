import {
  Box,
  GridItem,
  Heading,
  Link,
  Skeleton,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Report } from '~/lib/interfaces/report.interfaces';
import { ROUTES } from '~/lib/utils/constants';
import { dateFormatter } from '~/lib/utils/Formatters';

interface SavedTemplateProps {
  isLoading?: boolean;
  report: Report;
}

const SavedTemplate = (props: SavedTemplateProps) => {
  const { report, isLoading } = props;
  return (
    // <GridItem width="full">
    <Skeleton isLoaded={!isLoading} width="full" height="full">
      <Box
        bg="white"
        p="12px"
        borderRadius="md"
        border="1px solid #F2F1F1"
        height="200px"
        // minWidth={200}
      >
        <VStack alignItems="start" height="full" justifyContent="space-between">
          <VStack alignItems="start">
            <Heading
              fontSize={14}
              fontWeight={700}
              color="#0E2642"
              lineHeight="16.63px"
            >
              {report.reportName}
            </Heading>

            <Text
              color="#838383"
              size="md"
              fontWeight="700"
              lineHeight="16.63px"
            >
              Created by: {report.createdBy}
            </Text>
            <Text lineHeight="14.26px" fontWeight="500">
              {dateFormatter(report.createdDate, 'DD MM YYYY')}
            </Text>
          </VStack>

          <Link
            color="#0366EF"
            fontWeight="500"
            fontSize="12px"
            href={`/${ROUTES.REPORT}/${report.reportId}`}
          >
            Generate Report
          </Link>
        </VStack>
      </Box>
    </Skeleton>
    // </GridItem>
  );
};

export default SavedTemplate;
