/* eslint-disable no-unused-vars */
import {
  Avatar,
  Flex,
  HStack,
  Icon,
  ModalBody,
  ModalHeader,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from '@chakra-ui/react';

import { SearchIcon } from '@chakra-ui/icons';
import { GenericModal, TextInput } from '@repo/ui/components';
import { useState } from 'react';
import { CloseIcon } from '~/lib/components/CustomIcons';
import { useGetAllEmployeesQuery } from '~/lib/redux/services/employees.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import useNodeActions from '../../../Logic/useNodeActions';

interface SubCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  nodeId: string;
}
const AddApprovalUserModal = (props: SubCategoryModalProps) => {
  const { isOpen, onClose, nodeId } = props;

  const actionGroups = [
    { actionId: 1, actionName: 'Require to Approve' },
    { actionId: 2, actionName: 'Parallel Approve' },
    { actionId: 3, actionName: 'Inform when Approve' },
    { actionId: 4, actionName: 'Acknowledge Approval' },
    { actionId: 5, actionName: 'Escalate to (if no action)' },
  ];

  const { onUpdateNode } = useNodeActions();

  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useGetAllEmployeesQuery({
    pageSize: DEFAULT_PAGE_SIZE,
    pageNumber,
  });

  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      contentStyle={{ width: { sm: '450px' } }}
    >
      <ModalHeader m={0} p={0} my="24px" px="24px">
        <HStack w="full" justifyContent="space-between">
          <Text
            fontSize="24px"
            lineHeight="28.51px"
            color="primary.500"
            fontWeight={700}
          >
            Select User
          </Text>

          <HStack color="#F50000" onClick={onClose}>
            <Text>Close</Text>
            <Icon as={CloseIcon} />
          </HStack>
        </HStack>
      </ModalHeader>

      <ModalBody p="24px" m={0} width="full">
        <TextInput
          label="Search"
          name="search"
          type="text"
          customLeftElement={<SearchIcon />}
          leftElementWidth="32px"
          placeholder="Search for User"
        />

        <Tabs variant="custom" width={'full'}>
          <TabList mt="1em">
            <Tab paddingBottom="4px">User List</Tab>
            <Tab paddingBottom="4px">Group List</Tab>
          </TabList>

          <TabPanels>
            <TabPanel mt="24px">
              <VStack alignItems="start" gap="8px" w="full">
                {data?.data.items.map((item) => (
                  <HStack
                    w="full"
                    cursor="pointer"
                    transition="all 200ms ease-in-out"
                    py="12px"
                    px="8px"
                    rounded="8px"
                    _hover={{
                      bgColor: '#F7F7F7',
                    }}
                    onClick={() => {
                      onUpdateNode(nodeId, {
                        approveeId: item.employeeId,
                        approveeType: 'individual',
                        approveeName: item.employeeName,
                        approveeRole: 'Operational Manager',
                      });
                      onClose();
                    }}
                  >
                    <Avatar width="40px" height="40px" />
                    <Flex direction="column">
                      <Text color="black" size="md" fontWeight={700}>
                        {item.employeeName}
                      </Text>
                      <Text color="#838383" fontSize="10px" fontWeight={400}>
                        {item.emailAddress}
                      </Text>
                    </Flex>
                  </HStack>
                ))}
              </VStack>
            </TabPanel>

            <TabPanel mt="24px">
              <VStack alignItems="start" gap="8px" w="full">
                {data?.data.items.map((item) => (
                  <HStack
                    w="full"
                    cursor="pointer"
                    transition="all 200ms ease-in-out"
                    py="12px"
                    px="8px"
                    rounded="8px"
                    _hover={{
                      bgColor: '#F7F7F7',
                    }}
                    onClick={() => {
                      onUpdateNode(nodeId, {
                        approveeId: item.employeeId,
                        approveeType: 'group',
                        approveeGroupName: 'HR Department',
                      });
                      onClose();
                    }}
                  >
                    <Avatar width="40px" height="40px" />
                    <Flex direction="column">
                      <Text color="black" size="md" fontWeight={700}>
                        {item.employeeName}
                      </Text>
                      <Text color="#838383" fontSize="10px" fontWeight={400}>
                        {item.emailAddress}
                      </Text>
                    </Flex>
                  </HStack>
                ))}
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </ModalBody>
    </GenericModal>
  );
};

export default AddApprovalUserModal;
