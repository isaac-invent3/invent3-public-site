import { Flex, VStack } from '@chakra-ui/react';
import EmployeeInfo from './EmployeeInfo';
import RoleGroupInfo from './RoleGroupInfo';
import DocumentSummaryView from '~/lib/components/Common/DocumentUploadAndView/DocumentSummaryView';
import { useAppSelector } from '~/lib/redux/hooks';

const SectionTwo = () => {
  const { documents } = useAppSelector((state) => state.user.userForm);
  return (
    <Flex
      width="full"
      gap={{ base: '40px', lg: '16px' }}
      direction={{ base: 'column', lg: 'row' }}
    >
      <Flex
        width={{ base: 'full', lg: '592px' }}
        alignItems="flex-start"
        bgColor="#F5F5F5"
        minH="full"
        rounded="16px"
        p="16px"
        pb={{ lg: '118px' }}
      >
        <EmployeeInfo />
      </Flex>
      <VStack width={{ base: 'full', lg: '440px' }}>
        <Flex
          width="full"
          alignItems="flex-start"
          bgColor="#F5F5F5"
          rounded="16px"
          p="16px"
        >
          <RoleGroupInfo />
        </Flex>
        <Flex
          width="full"
          alignItems="flex-start"
          bgColor="#F5F5F5"
          rounded="16px"
          p="16px"
        >
          <DocumentSummaryView documents={documents} />
        </Flex>
      </VStack>
    </Flex>
  );
};

export default SectionTwo;
