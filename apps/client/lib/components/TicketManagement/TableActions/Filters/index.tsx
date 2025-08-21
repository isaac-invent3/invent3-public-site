import CombinedLocationFilter from '~/lib/components/Common/FilterComponents/CombinedLocationFilter';
import FilterWrapper from '~/lib/components/Common/FilterComponents/FilterWrapper';
import { initialFilterData } from '../..';
import TicketTypeFilter from './TicketTypeFilter';
import {
  TicketCategory,
  TicketFilter,
} from '~/lib/interfaces/ticket.interfaces';
import { Option } from '~/lib/interfaces/general.interfaces';
import UsersFilter from '~/lib/components/Common/FilterComponents/UsersFilter';

interface FiltersProps {
  filterData: TicketFilter;
  setFilterData: React.Dispatch<React.SetStateAction<TicketFilter>>;
  onApply: () => void;
  onClear: () => void;
  ticketCategory: TicketCategory;
}
const Filters = (props: FiltersProps) => {
  const { filterData, setFilterData, onApply, onClear, ticketCategory } = props;

  type FilterLabel = keyof TicketFilter;

  const handleFilterData = (option: Option, filterLabel: FilterLabel) => {
    setFilterData((prev) => {
      const selectedFilterData = [...prev[filterLabel]];

      const optionIndex = selectedFilterData.find(
        (item) => item.value === option.value
      );

      if (optionIndex) {
        // Remove the value if it already exists
        return {
          ...prev,
          [filterLabel]: selectedFilterData.filter(
            (item) => item.value !== option.value
          ),
        };
      } else {
        // Add the value if it does not exist
        return {
          ...prev,
          [filterLabel]: [...selectedFilterData, option],
        };
      }
    });
  };
  return (
    <FilterWrapper handleApplyFilter={onApply} handleClearFilter={onClear}>
      <TicketTypeFilter
        selectedOptions={filterData.ticketTypes.map((item) => ({
          value: item.value,
          label: item.label,
        }))}
        handleSelectedOption={(value) => handleFilterData(value, 'ticketTypes')}
      />
      {ticketCategory !== 'new' && (
        <UsersFilter
          selectedOptions={filterData.users.map((item) => ({
            value: item.value,
            label: item.label,
          }))}
          handleSelectedOption={(value) => handleFilterData(value, 'users')}
        />
      )}
      <CombinedLocationFilter
        selectedRegion={filterData.region}
        selectedArea={filterData.area}
        selectedBranch={filterData.branch}
        handleSelectedOption={handleFilterData}
      />
    </FilterWrapper>
  );
};

export default Filters;
