import { FilterDropDown } from '@repo/ui/components';
import { Option } from '~/lib/interfaces/general.interfaces';
import { useGetSystemContextTypeColumnsInfoQuery } from '~/lib/redux/services/systemcontexttypes.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { generateOptions } from '~/lib/utils/helperFunctions';

interface SystemContextColumnsSelectProps {
  // eslint-disable-next-line no-unused-vars
  handleSelect: (options: Option) => void;
  selectedContextTypeId: number | undefined;
  selectedOptions: Option[];
}
const SystemContextColumnsSelect = (props: SystemContextColumnsSelectProps) => {
  const { handleSelect, selectedOptions, selectedContextTypeId } = props;

  const { data, isLoading } = useGetSystemContextTypeColumnsInfoQuery({
    systemContextTypeId: selectedContextTypeId!,
    pageNumber: 1,
    pageSize: DEFAULT_PAGE_SIZE,
  });

  return (
    <FilterDropDown
      label=""
      isLoading={isLoading}
      options={generateOptions(data?.data.items, 'columnName', 'columnName')}
      handleClick={handleSelect}
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
