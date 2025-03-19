/* eslint-disable no-unused-vars */
import { Button as ChakraButton, Grid, Text } from '@chakra-ui/react';

import { FormInputWrapper } from '@repo/ui/components';
import { useField } from 'formik';
import { useGetAllApprovalWorkflowRequirementTypesQuery } from '~/lib/redux/services/approval-workflow/requirementTypes.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import SkeletonButtonGroup from './SkeletonButtonGroup';

const ApprovalRequirementType = () => {
  const {
    data: approvalRequirementTypes,
    isLoading: isFetchingRequirementTypes,
  } = useGetAllApprovalWorkflowRequirementTypesQuery({
    pageNumber: 1,
    pageSize: DEFAULT_PAGE_SIZE,
  });

  const [field, meta, helpers] = useField('approvalRequirementTypeId');

  return (
    <FormInputWrapper
      sectionMaxWidth="141px"
      spacing="24px"
      description="Choose the category and the sub-category"
      title="Approval Requirement"
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
        {isFetchingRequirementTypes && <SkeletonButtonGroup />}

        {!isFetchingRequirementTypes &&
          approvalRequirementTypes?.data.items.map(
            ({ approvalRequirementTypeId, approvalRequirementTypeName }) => {
              const selected = meta.value === approvalRequirementTypeId;

              return (
                <ChakraButton
                  key={approvalRequirementTypeId}
                  w="full"
                  bgColor={selected ? 'primary.500' : '#F7F7F7'}
                  color={selected ? '#F7F7F7' : 'primary.500'}
                  py="16px"
                  px="8px"
                  justifyContent="start"
                  onClick={() => {
                    helpers.setValue(approvalRequirementTypeId);
                  }}
                >
                  <Text size="md" fontWeight={700}>
                    {approvalRequirementTypeName}
                  </Text>
                </ChakraButton>
              );
            }
          )}
      </Grid>
    </FormInputWrapper>
  );
};

export default ApprovalRequirementType;
