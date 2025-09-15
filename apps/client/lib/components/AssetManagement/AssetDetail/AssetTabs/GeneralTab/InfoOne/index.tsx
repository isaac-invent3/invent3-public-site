import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  HStack,
  Icon,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '~/lib/components/CustomIcons';
import AssetLocation from './AssetLocation';
import { useAppSelector } from '~/lib/redux/hooks';
import OwnersInfo from './OwnersInfo';
import AssetDimension from './AssetDimension';

const InfoOne = () => {
  const assetData = useAppSelector((state) => state.asset.asset);

  if (!assetData) {
    return null;
  }

  const { description } = assetData;

  const info = [
    {
      label: 'Asset Location',
      details: <AssetLocation />,
    },
    {
      label: 'Asset Description',
      details: (
        <Text fontWeight={400} lineHeight="140%">
          {description}
        </Text>
      ),
    },
    {
      label: 'Asset Dimension',
      details: <AssetDimension />,
    },
    {
      label: "Owner's Info",
      details: <OwnersInfo />,
    },
  ];

  return (
    <Accordion width="full" allowToggle>
      {info.map((item, index) => (
        <AccordionItem
          bgColor="#F7F7F7"
          p={0}
          overflow="hidden"
          border="none"
          width="full"
          key={index}
        >
          {({ isExpanded }) => (
            <>
              <AccordionButton
                p={0}
                _hover={{ bgColor: 'none' }}
                borderBottomWidth="1px"
                borderColor="#BBBBBB !important"
              >
                <HStack
                  width="full"
                  justifyContent="space-between"
                  bgColor={isExpanded ? '#9B9B9B33' : '#9B9B9B1A'}
                  py="12px"
                  px="16px"
                >
                  <Text
                    size="md"
                    fontWeight={isExpanded ? 700 : 500}
                    lineHeight="100%"
                    color="neutral.800"
                  >
                    {item.label}
                  </Text>
                  <Icon
                    as={isExpanded ? ChevronUpIcon : ChevronDownIcon}
                    boxSize="24px"
                    color="neutral.800"
                  />
                </HStack>
              </AccordionButton>
              <AccordionPanel p="8px">{item.details}</AccordionPanel>
            </>
          )}
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default InfoOne;
