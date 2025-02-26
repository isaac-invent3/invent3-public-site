import { Box, BoxProps, Flex, FlexProps, Stack } from '@chakra-ui/react';
import React from 'react';

interface CustomTableProps {
  headers: React.ReactNode[];
  data: React.ReactNode[][];
  containerProps?: BoxProps;
  headerProps?: FlexProps;
  rowProps?: FlexProps;
  cellProps?: BoxProps;
}

const UploadStatusTable: React.FC<CustomTableProps> = ({
  headers,
  data,
  containerProps,
  headerProps,
  rowProps,
  cellProps,
}) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      overflow="hidden"
      w="full"
      {...containerProps}
    >
      {/* Header Row */}
      <Flex
        bg="#B4BFCAE5"
        borderBottomWidth="1px"
        borderColor="#BBBBBB"
        p="16px"
        {...headerProps}
      >
        {headers.map((header, index) => (
          <Box
            color="black"
            fontSize="12px"
            fontWeight={500}
            textTransform="uppercase"
            key={index}
            flex="1"
            {...cellProps}
          >
            {header}
          </Box>
        ))}
      </Flex>

      {/* Data Rows */}
      <Stack spacing={0}>
        {data.map((row, index) => (
          <Flex
            key={index}
            borderBottomWidth="1px"
            borderColor="#BBBBBB"
            px="16px"
            py="10px"
            {...rowProps}
          >
            {row.map((cell, cellIndex) => (
              <Box
                flex="1"
                color="black"
                fontSize="12px"
                fontWeight={500}
                key={`cell-${index}-${cellIndex}`}
                {...cellProps}
              >
                {cell}
              </Box>
            ))}
          </Flex>
        ))}
      </Stack>
    </Box>
  );
};

export default UploadStatusTable;
