import { FormSelect } from '@repo/ui/components';
import React from 'react';
import { useGetLifecyleStagesQuery } from '~/lib/redux/services/asset/lifeCycle.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { generateOptions } from '~/lib/utils/helperFunctions';

const StageSelect = () => {
  const { data, isLoading } = useGetLifecyleStagesQuery({
    pageNumber: 1,
    pageSize: DEFAULT_PAGE_SIZE,
  });
  return (
    <FormSelect
      name="stageId"
      title="Stage"
      options={generateOptions(
        data?.data?.items,
        'lifeCycleStageName',
        'lifeCycleId'
      )}
      selectStyles={{
        height: '46px',
        pt: '0px',
        //   backgroundColor: formik.errors.slaReminderHours
        //     ? '#FFDCDC'
        //     : '#E6E6E6',
      }}
      isLoading={isLoading}
      showTitleAfterSelect={true}
    />
  );
};

export default StageSelect;
