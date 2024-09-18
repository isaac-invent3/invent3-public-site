/* eslint-disable no-unused-vars */
import {
  Skeleton,
  TableContainer,
  Text,
  Thead,
  Table,
  Flex,
  Tr,
  Th,
  Tbody,
  Td,
  Box,
  IconButton,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useGetAssetComponentInfoByAssetGuidQuery } from '~/lib/redux/services/asset/general.services';
import { useAppSelector } from '~/lib/redux/hooks';
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import TableRow from './TableRow';
import { Asset } from '~/lib/interfaces/asset.interfaces';

const EmptyState = ({ text }: { text: string }) => {
  return (
    <Text
      width="full"
      size="md"
      fontWeight={400}
      fontStyle="italic"
      my="41px"
      color="neutral.600"
      textAlign="center"
    >
      {text}
    </Text>
  );
};

const RelationshipTab = () => {
  const [isParentOpen, setIsParentOpen] = useState(false);
  const [isAssetOpen, setIsAssetOpen] = useState(false);

  const assetData = useAppSelector((state) => state.asset.asset);
  const { data, isLoading } = useGetAssetComponentInfoByAssetGuidQuery(
    { id: assetData.guid },
    { skip: !assetData.guid }
  );

  // Determine if any parent and child component exists
  const hasParent = data && data?.data?.parent !== null;
  const hasChildren =
    data &&
    data?.data?.childComponents &&
    data?.data?.childComponents.length > 0;

  // Handlers to toggle expansion
  const toggleParent = () => {
    if (isParentOpen) {
      setIsAssetOpen(false);
      setIsParentOpen(false);
    } else {
      setIsParentOpen(true);
    }
  };
  const toggleAsset = () => setIsAssetOpen(!isAssetOpen);

  if (isLoading) {
    return <Skeleton height="100px" mt="24px" />;
  }

  if (!isLoading && !hasParent && !hasChildren) {
    return <EmptyState text="This asset has no component" />;
  }

  const TableHeaders = [
    'Asset ID',
    'Asset Name',
    'Asset Code',
    'Category',
    'Subcategory',
    'Brand Name',
    'Model Reference',
    'Owner',
    'Assigned To',
    'Responsible For',
    'Facility',
    'Building',
    'Floor',
    'Department',
    'Room',
    'Aisle',
    'Shelf',
    'Acquisition Date',
    'Purchase Date',
    'Initial Value',
    'Resale Value',
    'Scrap Value',
    'Current Cost',
    'Maintenance Cost',
    'Life Expectancy',
    'Last Maintenance',
    'Next Maintenance',
    'Weight',
    'Length',
    'Width',
    'Height',
    'Date Created',
    'Status',
  ];

  return (
    <Flex direction="column" width="full" my="24px">
      <TableContainer overflow="auto">
        <Table>
          <Thead bgColor="#B4BFCA80">
            <Tr>
              {TableHeaders.map((headers, index) => (
                <Th
                  key={index}
                  textTransform="capitalize"
                  fontSize="12px"
                  lineHeight="14.26px"
                  fontWeight={500}
                  color="black"
                  px="16px"
                  py="8px"
                >
                  {headers}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {hasParent && (
              <Tr>
                <Td
                  borderColor="#BBBBBB"
                  color="black"
                  fontSize="12px"
                  lineHeight="14.26px"
                  fontWeight={500}
                  pt="16px"
                  pb="8px"
                  px="16px"
                  whiteSpace="nowrap"
                >
                  <IconButton
                    aria-label="Expand Parent"
                    icon={
                      isParentOpen ? <ChevronDownIcon /> : <ChevronRightIcon />
                    }
                    size="xs"
                    onClick={toggleParent}
                    variant="none"
                  />
                  {data?.data?.parent?.assetId}
                </Td>
                {TableRow(data?.data?.parent).map((item, index) => (
                  <Td
                    key={index}
                    borderColor="#BBBBBB"
                    color="black"
                    fontSize="12px"
                    lineHeight="14.26px"
                    fontWeight={500}
                    pt="16px"
                    pb="8px"
                    px="16px"
                    whiteSpace="nowrap"
                  >
                    {item}
                  </Td>
                ))}
              </Tr>
            )}

            {isParentOpen && (
              <Tr>
                <Td
                  borderColor="#BBBBBB"
                  color="black"
                  fontSize="12px"
                  lineHeight="14.26px"
                  fontWeight={500}
                  pt="16px"
                  pb="8px"
                  pl={hasParent ? '32px' : '16px'}
                  pr="16px"
                  whiteSpace="nowrap"
                >
                  {hasChildren && (
                    <IconButton
                      aria-label="Expand Asset"
                      icon={
                        isAssetOpen ? <ChevronDownIcon /> : <ChevronRightIcon />
                      }
                      size="xs"
                      onClick={toggleAsset}
                      variant="none"
                    />
                  )}
                  {data?.data?.asset?.assetId}
                </Td>
                {TableRow(data?.data?.asset).map((item, index) => (
                  <Td
                    key={index}
                    borderColor="#BBBBBB"
                    color="black"
                    fontSize="12px"
                    lineHeight="14.26px"
                    fontWeight={500}
                    pt="16px"
                    pb="8px"
                    px="16px"
                    whiteSpace="nowrap"
                  >
                    {item}
                  </Td>
                ))}
              </Tr>
            )}

            {isAssetOpen &&
              data?.data?.childComponents.map((item: Asset, index: number) => (
                <Tr key={index}>
                  <Td
                    borderColor="#BBBBBB"
                    color="black"
                    fontSize="12px"
                    lineHeight="14.26px"
                    fontWeight={500}
                    pt="16px"
                    pb="8px"
                    pl={hasParent ? '70px' : '32px'}
                    pr="16px"
                    whiteSpace="nowrap"
                  >
                    {item.assetId}
                  </Td>
                  {TableRow(item).map((item, index) => (
                    <Td
                      key={index}
                      borderColor="#BBBBBB"
                      color="black"
                      fontSize="12px"
                      lineHeight="14.26px"
                      fontWeight={500}
                      pt="16px"
                      pb="8px"
                      px="16px"
                      whiteSpace="nowrap"
                    >
                      {item}
                    </Td>
                  ))}
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};

export default RelationshipTab;
