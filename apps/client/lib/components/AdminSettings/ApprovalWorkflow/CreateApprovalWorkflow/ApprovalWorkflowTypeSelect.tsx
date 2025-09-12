import { useMediaQuery } from '@chakra-ui/react';
import { FormSelect } from '@repo/ui/components';
import React, { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { Option } from '~/lib/interfaces/general.interfaces';
import {
  useGetAllApprovalWorkflowTypesQuery,
  useSearchApprovalWorkflowTypesMutation,
} from '~/lib/redux/services/approval-workflow/types.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { generateOptions } from '~/lib/utils/helperFunctions';

interface ApprovalWorkflowTypeSelectProps {
  // eslint-disable-next-line no-unused-vars
  handleSelect?: (options: Option) => void;
  selectName: string;
  selectTitle: string;
  defaultInputValue?: string | null;
  existingApprovalWorkflowId: number[];
}

const ApprovalWorkflowTypeSelect = (props: ApprovalWorkflowTypeSelectProps) => {
  const {
    handleSelect,
    selectName,
    selectTitle,
    defaultInputValue,
    existingApprovalWorkflowId,
  } = props;
  const [searchApprovalWorkflow] = useSearchApprovalWorkflowTypesMutation({});
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useGetAllApprovalWorkflowTypesQuery({
    pageSize: DEFAULT_PAGE_SIZE,
    pageNumber,
  });
  // Filter out approval workflow types that already exist
  const filteredData = data?.data?.items?.filter(
    (item) => !existingApprovalWorkflowId.includes(item.approvalTypeId)
  );

  const [isMobile] = useMediaQuery('(max-width: 480px)');

  return (
    <FormSelect
      name={selectName}
      title={selectTitle}
      options={generateOptions(
        filteredData,
        'approvalTypeName',
        'approvalTypeId'
      )}
      containerStyles={{
        width: isMobile ? '100%' : '282px',
      }}
      selectStyles={{
        height: '46px',
        pt: '0px',
        backgroundColor: '#FCFCFC',
      }}
      showTitleAfterSelect={false}
    />
  );
};

export default ApprovalWorkflowTypeSelect;
