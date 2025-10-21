import OwnerFilter from './OwnerFilter';
import ContextTypeFilter from './ContextType';
import FilterWrapper from '../../Common/FilterComponents/FilterWrapper';
import { DatePopover } from '@repo/ui/components';
import moment from 'moment';
import { TemplateFilter } from '~/lib/interfaces/template.interfaces';

interface TemplateFiltersProps {
  type: 'page' | 'modal';
  filterData: TemplateFilter;
  setFilterData: React.Dispatch<React.SetStateAction<TemplateFilter>>;
  onApply: () => void;
  onClear: () => void;
}
const TemplateFilters = (props: TemplateFiltersProps) => {
  const { type, filterData, setFilterData, onApply, onClear } = props;
  return (
    <FilterWrapper handleApplyFilter={onApply} handleClearFilter={onClear}>
      {type === 'page' && (
        <ContextTypeFilter
          selected={filterData.contextTypeId}
          onChange={(option) =>
            setFilterData((prev) => ({
              ...prev,
              contextTypeId: filterData.contextTypeId.includes(+option?.value)
                ? filterData.contextTypeId.filter(
                    (value) => value !== option?.value
                  )
                : [...filterData.contextTypeId, +option?.value],
            }))
          }
        />
      )}
      <OwnerFilter
        selected={filterData.owner}
        onChange={(option) =>
          setFilterData((prev) => ({
            ...prev,
            owner: filterData.owner.includes(option?.value as string)
              ? filterData.owner.filter(
                  (item) => item !== (option?.value as string)
                )
              : [...filterData.owner, option?.value as string],
          }))
        }
      />
      {/* <DatePopover
        label="Date Created"
        selectedDate={
          filterData.createdDate
            ? moment(filterData.createdDate, 'YYYY-MM-DD').toDate()
            : undefined
        }
        setSelectedDate={(date) =>
          setFilterData((prev) => ({
            ...prev,
            createdDate: moment(date).format('YYYY-MM-DD'),
          }))
        }
        customStyle={{ border: '1px solid #DADFE5' }}
      /> */}
    </FilterWrapper>
  );
};

export default TemplateFilters;
