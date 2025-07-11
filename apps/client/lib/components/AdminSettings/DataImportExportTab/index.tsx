import { VStack } from '@chakra-ui/react';
import React from 'react';
import DataUpload from '../../CompanyManagement/DataUpload/DataUpload';

const DataImportExportTab = () => {
  return (
    <VStack spacing="24px" width="full" alignItems="flex-start">
      <DataUpload />
    </VStack>
  );
};

export default DataImportExportTab;
