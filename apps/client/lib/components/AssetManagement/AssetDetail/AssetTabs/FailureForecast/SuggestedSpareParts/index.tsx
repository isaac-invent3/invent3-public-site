import {
  ListItem,
  Skeleton,
  Text,
  UnorderedList,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import Detail from '~/lib/components/UI/ContentDetails/Detail';
import { AssetForecast } from '~/lib/interfaces/forecast.interfaces';
import SuggestedSpartPartsTable from './SuggestedSpartPartsTable';
import GenericStatusBox from '~/lib/components/UI/GenericStatusBox';

interface SuggestedSparePartsProps {
  isLoading: boolean;
  data?: AssetForecast;
}

const SuggestedSpareParts = (props: SuggestedSparePartsProps) => {
  const { data, isLoading } = props;

  const info = [
    {
      label: 'Part Name',
      key: 'partName',
    },
    {
      label: 'Required Quanity',
      key: 'requiredQty',
    },
    {
      label: 'Reserved Quanity',
      key: 'reservedQty',
    },
  ];

  return (
    <VStack width="full" spacing="12px" alignItems="flex-start">
      {isLoading && <Skeleton width="full" height="100px" />}
      {!isLoading && data && data?.forecastDrivers.length > 0 && (
        <VStack width="full" spacing="12px" alignItems="flex-start">
          <UnorderedList
            spacing="8px"
            width="full"
            alignItems="flex-start"
            pl="8px"
          >
            {info?.map((item, index) => (
              <ListItem
                key={index}
                color="black"
                fontSize="14px"
                fontWeight={500}
                lineHeight="100%"
              >
                <Detail
                  label={item?.label}
                  value={item?.key}
                  labelMinWidth="150px"
                  labelStyle={{ color: 'black' }}
                />
              </ListItem>
            ))}
            <ListItem
              color="black"
              fontSize="14px"
              fontWeight={500}
              lineHeight="100%"
            >
              <Detail
                label="Availability Status"
                labelMinWidth="150px"
                labelStyle={{ color: 'black' }}
              >
                <GenericStatusBox
                  text="Reserved"
                  colorCode="#058828"
                  showDot={false}
                  useColorCodeAsTextColor
                />
              </Detail>
            </ListItem>
          </UnorderedList>
          <SuggestedSpartPartsTable />
        </VStack>
      )}
      {!isLoading && (data?.forecastDrivers.length === 0 || !data) && (
        <Text
          fontStyle="italic"
          color="neutral.300"
          width="full"
          textAlign="center"
          size="md"
          my={8}
        >
          No Data at the moment
        </Text>
      )}
    </VStack>
  );
};

export default SuggestedSpareParts;
