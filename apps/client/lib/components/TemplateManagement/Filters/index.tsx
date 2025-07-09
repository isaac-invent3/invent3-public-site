import OwnerFilter from './OwnerFilter';
import ContextTypeFilter from './ContextType';
import FilterWrapper from '../../Common/FilterComponents/FilterWrapper';
import {
  clearTemplateFilter,
  updateTemplateFilter,
} from '~/lib/redux/slices/TemplateSlice';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { DatePopover } from '@repo/ui/components';
import moment from 'moment';

interface TemplateFiltersProps {
  handleApplyFilter: () => void;
  type: 'page' | 'modal';
}
const TemplateFilters = (props: TemplateFiltersProps) => {
  const { handleApplyFilter, type } = props;
  const dispatch = useAppDispatch();
  const { createdDate } = useAppSelector(
    (state) => state.template.templateFilters
  );
  return (
    <FilterWrapper
      handleApplyFilter={handleApplyFilter}
      handleClearFilter={() => dispatch(clearTemplateFilter())}
    >
      {type === 'page' && <ContextTypeFilter />}
      <OwnerFilter />
      <DatePopover
        label="Date Created"
        selectedDate={
          createdDate ? moment(createdDate, 'YYYY-MM-DD').toDate() : undefined
        }
        setSelectedDate={(date) =>
          dispatch(
            updateTemplateFilter({
              createdDate: moment(date).format('YYYY-MM-DD'),
            })
          )
        }
        customStyle={{ border: '1px solid #DADFE5' }}
      />
    </FilterWrapper>
  );
};

export default TemplateFilters;
