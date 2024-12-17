import { Option } from '~/lib/interfaces/general.interfaces';
import FilterDropDown from '../../UI/FilterDropDown';

interface SystemContextColumnsSelectProps {
  // eslint-disable-next-line no-unused-vars
  handleSelect: (options: Option) => void;
  selectedContextTypeId: number | undefined
  selectedOptions: Option[];
}
const SystemContextColumnsSelect = (props: SystemContextColumnsSelectProps) => {
  const { handleSelect, selectedOptions} = props;

  const dummyColumns: Option[] = [
    { label: 'Asset Name', value: 1 },
    { label: 'Asset Type', value: 2 },
    { label: 'Asset ID', value: 3 },
    { label: 'Acquisition Date', value: 4 },
    { label: 'Purchase Price', value: 5 },
    { label: 'Current Value', value: 6 },
    { label: 'Depreciation Rate', value: 7 },
    { label: 'Location', value: 8 },
    { label: 'Assigned To', value: 9 },
    { label: 'Maintenance Date', value: 10 },
    { label: 'Warranty Expiration', value: 11 },
    { label: 'Status', value: 12 },
    { label: 'Supplier Name', value: 13 },
  ];

  return (
    <FilterDropDown
      label=""
      options={dummyColumns}
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
