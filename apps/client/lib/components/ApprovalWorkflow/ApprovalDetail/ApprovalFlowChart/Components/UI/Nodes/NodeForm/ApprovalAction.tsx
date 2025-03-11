/* eslint-disable no-unused-vars */
import { Button as ChakraButton, Grid, Text } from '@chakra-ui/react';

import { FormInputWrapper } from '@repo/ui/components';
import { useField } from 'formik';
import { useGetAllApprovalActionsQuery } from '~/lib/redux/services/approval-workflow/actions.services';
import SkeletonButtonGroup from './SkeletonButtonGroup';
import { useGetAllApprovalWorkflowTypesQuery } from '~/lib/redux/services/approval-workflow/types.services';

const ApprovalAction = () => {
  const { data: approvalActionsData, isLoading: isFetchingApprovalActions } =
    useGetAllApprovalActionsQuery();

    const {} = useGetAllApprovalWorkflowTypesQuery({
        systemContextTypeId:29
    })


  const [field, meta, helpers] = useField('approvalActionId');

  return (
    <FormInputWrapper
      sectionMaxWidth="141px"
      spacing="24px"
      description="Choose the category and the sub-category"
      title="Approval Action"
      isRequired
    >
      <Grid
        templateColumns={{
          base: '1fr',
          md: 'repeat(2, 1fr)',
        }}
        gap="16px"
        height="100%"
        w="full"
      >
        {isFetchingApprovalActions && <SkeletonButtonGroup />}

        {!isFetchingApprovalActions &&
          approvalActionsData?.data.items.map(
            ({ approvalActionId, actionName }) => {
              const selected = meta.value === approvalActionId;

              return (
                <ChakraButton
                  key={approvalActionId}
                  w="full"
                  bgColor={selected ? 'primary.500' : '#F7F7F7'}
                  color={selected ? '#F7F7F7' : 'primary.500'}
                  py="16px"
                  px="8px"
                  justifyContent="start"
                  onClick={() => {
                    helpers.setValue(approvalActionId);
                  }}
                >
                  <Text size="md" fontWeight={700}>
                    {actionName}
                  </Text>
                </ChakraButton>
              );
            }
          )}
      </Grid>
    </FormInputWrapper>
  );
};

export default ApprovalAction;
