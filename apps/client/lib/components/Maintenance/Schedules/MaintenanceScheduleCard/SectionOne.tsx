import {
  HStack,
  Icon,
  SimpleGrid,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {
  parseOccurrences,
  summaryText,
} from '~/lib/components/Common/HelperFunctions/RecurrenceSummary';
import { InfoIcon } from '~/lib/components/CustomIcons';
import { MaintenanceSchedule } from '~/lib/interfaces/maintenance.interfaces';
import { dateFormatter } from '~/lib/utils/Formatters';

function isTextOverflowing(elementId: string) {
  const element = document.getElementById(elementId);
  if (!element) return false;

  return (
    element.scrollHeight > element.offsetHeight ||
    element.scrollWidth > element.offsetWidth
  );
}

interface SectionOneProps {
  data: MaintenanceSchedule;
}
const SectionOne = (props: SectionOneProps) => {
  const { data } = props;
  const [showTooltip, setShowTooltip] = useState(false);

  const occurrenceText = summaryText({
    occurrences: parseOccurrences(data?.occurrences),
    frequency: data?.frequencyName,
    endDate: data?.endDate,
    interval: data?.intervalValue,
  });

  useEffect(() => {
    const checkOverflow = () => {
      setShowTooltip(isTextOverflowing('occurrence-text'));
    };

    checkOverflow();
  }, [occurrenceText]);

  return (
    <HStack
      width="full"
      p="8px"
      pb="15px"
      justifyContent="space-between"
      alignItems="flex-start"
      spacing="43px"
      bgColor="neutral.200"
    >
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap="32px" width="100%">
        {/* Date Starts Here */}
        <VStack spacing="8px" alignItems="flex-start" width="140px">
          <Text color="neutral.600" fontWeight={700}>
            Start Date
          </Text>
          <VStack alignItems="flex-start" spacing="4px">
            <Text color="neutral.800" fontWeight={800} whiteSpace="nowrap">
              {data?.scheduledDate
                ? dateFormatter(data?.scheduledDate, 'Do MMM, YYYY hh:mmA')
                : 'N/A'}
            </Text>
            <HStack spacing="8px" alignItems="flex-end" width="full">
              <Text
                id="occurrence-text"
                color="neutral.600"
                noOfLines={2}
                textOverflow="ellipsis"
              >
                {occurrenceText}
              </Text>
              {showTooltip && (
                <Tooltip
                  label={summaryText({
                    occurrences: parseOccurrences(data?.occurrences),
                    frequency: data?.frequencyName,
                    endDate: data?.endDate,
                    interval: data?.intervalValue,
                  })}
                  placement="top"
                >
                  <Icon as={InfoIcon} boxSize="16px" color="blue.500" />
                </Tooltip>
              )}
            </HStack>
          </VStack>
        </VStack>
        {/* Date Ends Here */}

        {/* Description Starts Here */}
        <VStack spacing="8px" alignItems="flex-start">
          <Text color="neutral.600" fontWeight={700}>
            Title
          </Text>
          <VStack alignItems="flex-start" spacing="4px">
            <Text color="neutral.800" size="md" fontWeight={800}>
              {data?.scheduleName}
            </Text>
            <Text color="neutral.600">{data?.maintenanceType}</Text>
          </VStack>
        </VStack>
        {/* Description Ends Here */}
        {/* Contact Starts Here */}
        <VStack spacing="8px" alignItems="flex-start">
          <Text color="neutral.600" fontWeight={700} whiteSpace="nowrap">
            Engineer / Contact Person
          </Text>
          {[
            data?.contactPerson,
            data?.contactPersonPhoneNo,
            data?.contactPersonEmail,
          ].filter(Boolean).length >= 1 ? (
            <VStack spacing="4px" alignItems="flex-start">
              {data?.contactPerson && (
                <Text size="md" fontWeight={800} color="neutral.800">
                  {data?.contactPerson}
                </Text>
              )}
              {data?.contactPersonPhoneNo && (
                <Text color="neutral.800">{data?.contactPersonPhoneNo}</Text>
              )}
              {data?.contactPersonEmail && (
                <Text color="neutral.800">{data?.contactPersonEmail}</Text>
              )}
            </VStack>
          ) : (
            <Text color="neutral.600">N/A</Text>
          )}
        </VStack>
        {/* Contact Ends Here */}
        {/* SLA and Action Button */}
        <VStack
          spacing="8px"
          alignItems="flex-start"
          justifySelf={{ lg: 'end' }}
        >
          <Text color="neutral.600" fontWeight={700}>
            SLA:
          </Text>
          <Text fontWeight={800}>
            {data?.sla
              ? `${data?.sla} Hour ${data?.sla > 1 ? 's' : ''}`
              : 'N/A'}
          </Text>
        </VStack>
      </SimpleGrid>
    </HStack>
  );
};

export default SectionOne;
