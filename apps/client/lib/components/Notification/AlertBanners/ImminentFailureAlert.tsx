'use client';
import {
  HStack,
  Icon,
  Text,
  VStack,
  Box,
  Flex,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { CloseIcon, WarningIcon } from '../../CustomIcons';
import PredictiveAlert from '../../TicketManagement/Drawers/TicketDrawerWrapper/SourceAlert/PredictiveAlert';
import { useGetRecentPredictionAlertQuery } from '~/lib/redux/services/prediction.services';
import { Prediction } from '~/lib/interfaces/prediction.interfaces';

interface ImminentFailureAlertProps {
  predicton: Prediction;
  closeAlert: (id: number) => void;
}

const ImminentFailureAlert = ({
  predicton,
  closeAlert,
}: ImminentFailureAlertProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <HStack
        bgColor="white"
        borderLeft="3px solid #F50000"
        py="8px"
        px="16px"
        boxShadow="lg"
        justifyContent="space-between"
        alignItems="flex-start"
        rounded="2px"
        position="relative"
      >
        <Flex
          position="absolute"
          top={0}
          bottom={0}
          left={0}
          right={0}
          bgColor="#F500001A"
        />
        <HStack
          spacing="12px"
          align="flex-start"
          pr={{ lg: '94px' }}
          position="relative"
          zIndex={10}
        >
          <Icon as={WarningIcon} boxSize="28px" color="#F50000" />
          <VStack align="flex-start" spacing="6px">
            <Text
              fontWeight={700}
              fontSize="20px"
              lineHeight="100%"
              color="black"
            >
              Imminent Failure Alert
            </Text>
            <Text size="md" lineHeight="100%" color="#F50000">
              {predicton?.assetName} is predicted to fail within 7 days
            </Text>
          </VStack>
        </HStack>

        <VStack
          spacing="28px"
          alignItems="flex-end"
          borderLeft="1px solid #BBBBBB"
          pl="32px"
          height="full"
          justifyContent="space-between"
          position="relative"
          zIndex={10}
        >
          <Icon
            as={CloseIcon}
            color="#0366EF"
            cursor="pointer"
            onClick={() => closeAlert(predicton?.predictionId)}
          />
          <Text
            lineHeight="100%"
            fontWeight={700}
            color="#0366EF"
            cursor="pointer"
            onClick={onOpen}
          >
            View Details
          </Text>
        </VStack>
      </HStack>
      <PredictiveAlert
        isOpen={isOpen}
        onClose={onClose}
        predictiveAlertId={1}
        prediction={predicton}
        type="alert"
      />
    </>
  );
};

const ImminentFailureAlertList = () => {
  const [alerts, setAlerts] = useState<Prediction[]>([]);
  const { data: predictionAlertData } = useGetRecentPredictionAlertQuery(
    { page: 1, pageSize: 10 },
    {
      pollingInterval: 30000,
    }
  );
  const removeAlert = (id: number) => {
    setAlerts((prev) => prev.filter((alert) => alert.predictionId !== id));
  };

  React.useEffect(() => {
    if (
      predictionAlertData &&
      predictionAlertData.data &&
      predictionAlertData.data.items.length > 0
    ) {
      setAlerts(predictionAlertData.data.items);
    }
  }, [predictionAlertData]);

  return (
    <Box
      position="fixed"
      top="80px"
      right="20px"
      zIndex={1000}
      display="flex"
      flexDirection="column"
      gap="16px"
    >
      {alerts?.length > 0 &&
        alerts.map((alert) => (
          <ImminentFailureAlert
            key={alert.predictionId}
            predicton={alert}
            closeAlert={removeAlert}
          />
        ))}
    </Box>
  );
};

export default ImminentFailureAlertList;
