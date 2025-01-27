/* eslint-disable no-unused-vars */
import {
  Avatar,
  Button,
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
              <VStack>
                {data?.data.items.map((item) => (
                  <HStack spacing="8px">
                    <Avatar
                      width="30px"
                      height="30px"
                      // name={name ?? ''}
                    />
                    <Flex direction="column">
                      <Text color="black">{item.employeeName}</Text>
                      <Text color="black">{item.employeeId}</Text>
                    </Flex>
                  </HStack>
                ))}
              </VStack>
            </TabPanel>

            <TabPanel mt="24px"></TabPanel>
          </TabPanels>
        </Tabs>

        <VStack w="full" gap="8px">
          {actionGroups.map((actionGroup) => (
            <Button
              key={actionGroup.actionId}
              w="full"
              bgColor="#F7F7F7"
              color="primary.500"
              py="16px"
              px="8px"
              justifyContent="start"
              onClick={() => {
                onUpdateNode(nodeId, {
                  actionId: actionGroup.actionId,
                  actionName: actionGroup.actionName,
                });
                onClose();
              }}
            >
              <Text size="md" fontWeight={700}>
                {actionGroup.actionName}
              </Text>
            </Button>
          ))}
        </VStack>
      </ModalBody>
    </GenericModal>
  );
};

export default AddApprovalUserModal;
