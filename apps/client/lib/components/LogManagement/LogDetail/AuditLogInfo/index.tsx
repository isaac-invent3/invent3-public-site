import { Flex, VStack } from '@chakra-ui/react';
import Overview from './Overview';
import ChangedData from './ChangedData';
import { AuditChanges } from '~/lib/interfaces/log.interfaces';

interface AuditLogInfoProps {
  pageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  data?: AuditChanges[];
}
const AuditLogInfo = (props: AuditLogInfoProps) => {
  const { pageNumber, setPageNumber, pageSize, setPageSize, data } = props;
  return (
    <VStack width="full" spacing={{ base: '16px', lg: '32px' }}>
      <Overview />
      <ChangedData
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        pageSize={pageSize}
        setPageSize={setPageSize}
        data={data}
      />
    </VStack>
  );
};

export default AuditLogInfo;
