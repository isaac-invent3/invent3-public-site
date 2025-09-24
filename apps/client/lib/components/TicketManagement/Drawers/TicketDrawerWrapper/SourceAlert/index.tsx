import {
  HStack,
  Skeleton,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import Detail from '~/lib/components/UI/ContentDetails/Detail';
import PredictiveAlert from './PredictiveAlert';
import { Ticket } from '~/lib/interfaces/ticket.interfaces';
import { useGetAlertPredictionsByAlertIdQuery } from '~/lib/redux/services/prediction.services';
import { dateFormatter } from '~/lib/utils/Formatters';

const SourceAlert = ({ ticket }: { ticket: Ticket }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { data, isLoading } = useGetAlertPredictionsByAlertIdQuery({
    alertId: ticket.predictiveAlertId!,
  });

  if (isLoading) {
    return <Skeleton width="full" height="100px" rounded="6px" />;
  }
  return (
    <>
      <VStack spacing="8px" width="full">
        <HStack width="full" justifyContent="space-between">
          <Text color="neutral.600" fontWeight={700}>
            Source Alert
          </Text>
          <Text color="blue.500" cursor="pointer" onClick={onOpen}>
            View Full Predictive Alert
          </Text>
        </HStack>
        <HStack
          width="full"
          rounded="6px"
          borderWidth="1px"
          borderColor="#C9C9C9"
          p="8px"
          justifyContent="space-between"
        >
          <Detail
            label="Asset"
            value={data?.data?.assetName ?? 'N/A'}
            itemContainerStyle={{ direction: 'column' }}
            valueStyle={{ color: 'black' }}
            labelStyle={{ size: 'base', fontWeight: 700 }}
          />
          <Detail
            label="Risk Level"
            value={
              data?.data?.riskScore
                ? `${data?.data?.riskScore.toFixed(2)}%`
                : 'N/A'
            }
            itemContainerStyle={{ direction: 'column' }}
            valueStyle={{ color: 'red.500', fontWeight: 700 }}
            labelStyle={{ size: 'base', fontWeight: 700 }}
          />
          <Detail
            label="Predicted Failure Date"
            value={
              data?.data?.alertedDate
                ? dateFormatter(data?.data?.alertedDate, 'DD / MM / YYYY')
                : 'N/A'
            }
            itemContainerStyle={{ direction: 'column' }}
            valueStyle={{ color: 'black' }}
            labelStyle={{ size: 'base', fontWeight: 700 }}
          />
        </HStack>
      </VStack>
      <PredictiveAlert
        isOpen={isOpen}
        onClose={onClose}
        predictiveAlertId={ticket?.predictiveAlertId}
        type="detail"
        prediction={data?.data}
      />
    </>
  );
};

export default SourceAlert;
