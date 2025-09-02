import { VStack } from '@chakra-ui/react';
import React from 'react';
import DataUpload from '../../CompanyManagement/DataUpload/DataUpload';
import { DataImportHistory } from './DataImportHistory';

const DataImportExportTab = () => {
  return (
    <VStack spacing="24px" width="full" alignItems="flex-start">
      <DataUpload>
        <DataImportHistory />
      </DataUpload>
    </VStack>
  );
};

export default DataImportExportTab;
