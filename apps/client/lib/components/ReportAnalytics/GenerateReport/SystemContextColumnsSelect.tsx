import { FilterDropDown } from '@repo/ui/components';
import { useFormikContext } from 'formik';
import { useEffect } from 'react';
import { Option } from '~/lib/interfaces/general.interfaces';
import { GenerateReportDetails } from '~/lib/interfaces/report.interfaces';
import { useGetSystemContextTypeColumnsInfoQuery } from '~/lib/redux/services/systemcontexttypes.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { generateOptions } from '~/lib/utils/helperFunctions';

interface SystemContextColumnsSelectProps {
  selectedContextTypeId: number | undefined;
  selectedOptions: Option[];
}
const SystemContextColumnsSelect = (props: SystemContextColumnsSelectProps) => {
  const { selectedOptions, selectedContextTypeId } = props;

  const { setFieldValue, values } = useFormikContext<GenerateReportDetails>();

  const { data, isLoading } = useGetSystemContextTypeColumnsInfoQuery(
    {
      systemContextTypeId: selectedContextTypeId!,
      pageNumber: 1,
      pageSize: DEFAULT_PAGE_SIZE,
    },
    { skip: typeof selectedContextTypeId !== 'number' }
  );

  const allOptions = generateOptions(
    data?.data.items,
    'columnName',
    'columnName'
  );

  const containsOptions = (array: Option[], obj: Option) => {
    return array.some((item) => item.value === obj.value);
  };

  useEffect(() => {
    setFieldValue('contextTypeColumns', []);
  }, [values.contextTypeId]);

  useEffect(() => {
    setFieldValue('contextTypeColumns', allOptions);
  }, [data]);

  return (
    <FilterDropDown
      label=""
      isLoading={isLoading}
      options={allOptions}
      handleClick={(value) => {
        if (containsOptions(selectedOptions, value)) {
          setFieldValue(
            'contextTypeColumns',
            selectedOptions.filter((item) => item.value !== value.value)
          );
        } else {
          setFieldValue('contextTypeColumns', [...selectedOptions, value]);
        }
      }}
      selectedOptions={selectedOptions}
      containerStyles={{
        maxW: 'none',
      }}
      labelStyles={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
      chevronStyles={{
        boxSize: '16px',
      }}
    />
  );
};

export default SystemContextColumnsSelect;
