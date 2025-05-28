/* eslint-disable no-unused-vars */
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import { FormInputWrapper } from '@repo/ui/components';
import { useField } from 'formik';
import { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import {
  useGetAllUserGroupsInfoHeaderQuery,
  useGetAllUsersQuery,
  useSearchUserGroupMutation,
  useSearchUsersMutation,
} from '~/lib/redux/services/user.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';

const ApprovalAssignee = () => {
  const [searchUser] = useSearchUsersMutation({});

  const [userListPageNumber, setUserListPageNumber] = useState(1);

  const { data, isLoading } = useGetAllUsersQuery({
    pageSize: DEFAULT_PAGE_SIZE,
    pageNumber: userListPageNumber,
  });

  const { data: userGroups, isLoading: isLoadingUserGroups } =
    useGetAllUserGroupsInfoHeaderQuery({
      pageSize: DEFAULT_PAGE_SIZE,
      pageNumber: userListPageNumber,
    });

  const [searchUserGroups] = useSearchUserGroupMutation({});

  const [field, meta, helpers] = useField('userId');

  return (
    <FormInputWrapper
      sectionMaxWidth="141px"
      spacing="24px"
      description="Choose the category and the sub-category"
      title="Approval Assignee"
      isRequired
    >
      <Tabs variant="custom" width={'full'} minH="200px">
        <TabList mt="1em">
          <Tab paddingBottom="4px">User List</Tab>
          <Tab paddingBottom="4px">Group List</Tab>
        </TabList>

        <TabPanels>
          <TabPanel mt="24px">
            <GenericAsyncSelect
              selectName="userList"
              selectTitle="Select a User"
              data={data}
              labelKey="username"
              valueKey="userId"
              defaultInputValue={undefined}
              mutationFn={searchUser}
              isLoading={isLoading}
              pageNumber={userListPageNumber}
              setPageNumber={setUserListPageNumber}
              handleSelect={(option) => {
                helpers.setValue(option.value);
              }}
              showTitleAfterSelect
            />
          </TabPanel>

          <TabPanel mt="24px">
            <GenericAsyncSelect
              selectName="groupList"
              selectTitle="Select a Group"
              data={userGroups}
              labelKey="groupName"
              valueKey="groupId"
              defaultInputValue={undefined}
              mutationFn={searchUserGroups}
              isLoading={isLoadingUserGroups}
              pageNumber={userListPageNumber}
              setPageNumber={setUserListPageNumber}
              handleSelect={(option) => {
                helpers.setValue(option.value);
              }}
              showTitleAfterSelect
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </FormInputWrapper>
  );
};

export default ApprovalAssignee;
