import {
  Flex,
  Heading,
  HStack,
  Skeleton,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { amountFormatter, dateFormatter } from '~/lib/utils/Formatters';
import AnomalyDrawer from '../../Drawers/AnomalyDrawer';
import { useGetBmsAnomaliesByAssetIdQuery } from '~/lib/redux/services/bms/bmsAnomalies.services';
import { useEffect } from 'react';
import { updateAsset } from '~/lib/redux/slices/AssetSlice';

interface SummaryInfoProps {
  label: string;
  value?: string | number | React.ReactElement | null;
  children?: React.ReactNode;
}
const SummaryInfo = (props: SummaryInfoProps) => {
  const { label, value, children } = props;
  return (
    <Flex
      direction="column"
      gap="10px"
      bgColor="#FFFFFF99"
      p="16px"
      rounded="8px"
      minW="150px"
      flex="1"
    >
      <Text color="neutral.600">{label}</Text>
      <Text fontSize="20px" lineHeight="100%" color="primary.500">
        {value}
      </Text>
      {children}
    </Flex>
  );
};

const Summary = () => {
  const assetData = useAppSelector((state) => state.asset.asset);
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (!assetData) {
    return null;
  }

  const {
    lastMaintenanceDate,
    nextMaintenanceDate,
    y2DMaintenanceCost,
    currentCost,
    assetId,
  } = assetData;

  const { data: bmsAnomalies, isLoading: isLoadingAnomalies } =
    useGetBmsAnomaliesByAssetIdQuery({ assetId }, { skip: !assetId });
  const dispatch = useAppDispatch();

  const Summary1 = [
    // {
    //   label: 'Utilization Rate',
    //   value: '85%',
    // },
    {
      label: 'Current Value',
      value: currentCost !== null ? amountFormatter(currentCost) : 'N/A',
    },
    {
      label: 'Maintenance Cost (YTD)',
      value:
        y2DMaintenanceCost !== null
          ? amountFormatter(y2DMaintenanceCost)
          : 'N/A',
    },
  ];

  useEffect(() => {
    if (bmsAnomalies?.data && bmsAnomalies?.data?.items?.length > 0) {
      dispatch(updateAsset({ hasAnomaly: true }));
    }
  }, [bmsAnomalies]);

  return (
    <>
      <VStack width="full" alignItems="flex-start" spacing="8px">
        <Heading
          size="base"
          lineHeight="100%"
          fontWeight={700}
          color="primary.500"
        >
          Key Metrics
        </Heading>
        <HStack spacing="8px" width="full" overflowX="auto" align="stretch">
          {Summary1.map((item) => (
            <SummaryInfo {...item} key={item.label} />
          ))}
          <SummaryInfo
            label="Last Maintenance Date"
            value={
              lastMaintenanceDate !== null
                ? dateFormatter(lastMaintenanceDate, 'Do MMM, YYYY')
                : 'N/A'
            }
            children={
              <Text
                py="4px"
                px="8px"
                rounded="16px"
                bgColor="neutral.300"
                color="black"
                fontWeight={700}
                fontSize="10px"
                lineHeight="130%"
                width="max-content"
              >
                Preventive
              </Text>
            }
          />
          <SummaryInfo
            label="Next Maintenance Date"
            value={
              nextMaintenanceDate !== null
                ? dateFormatter(nextMaintenanceDate, 'Do MMM, YYYY')
                : 'N/A'
            }
          />
          <SummaryInfo label="Anomalies">
            <HStack
              width="full"
              justifyContent="space-between"
              alignItems="flex-end"
            >
              <Skeleton isLoaded={!isLoadingAnomalies}>
                <Text color="#F50000">
                  <Text as="span" fontSize="20px" lineHeight="100%">
                    {bmsAnomalies ? bmsAnomalies?.data?.totalItems : 0}{' '}
                  </Text>
                  active
                </Text>
              </Skeleton>
              {bmsAnomalies && bmsAnomalies?.data?.items?.length > 0 && (
                <Text
                  cursor="pointer"
                  color="blue.500"
                  fontWeight={700}
                  onClick={onOpen}
                >
                  View
                </Text>
              )}
            </HStack>
          </SummaryInfo>
        </HStack>
      </VStack>
      <AnomalyDrawer
        isOpen={isOpen}
        onClose={onClose}
        anomalies={bmsAnomalies?.data?.items ?? []}
      />
    </>
  );
};

export default Summary;
