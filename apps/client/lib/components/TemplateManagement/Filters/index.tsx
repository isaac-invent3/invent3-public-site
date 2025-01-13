import OwnerFilter from './OwnerFilter';
import CreatedDate from './CreatedDate';
import ContextTypeFilter from './ContextType';
import FilterWrapper from '../../Common/FilterComponents/FilterWrapper';
import { clearTemplateFilter } from '~/lib/redux/slices/TemplateSlice';
import { useAppDispatch } from '~/lib/redux/hooks';

interface TemplateFiltersProps {
  handleApplyFilter: () => Promise<void>;
  type: 'page' | 'modal';
}
const TemplateFilters = (props: TemplateFiltersProps) => {
  const { handleApplyFilter, type } = props;
  const dispatch = useAppDispatch();
  return (
    <FilterWrapper
      handleApplyFilter={handleApplyFilter}
      handleClearFilter={() => dispatch(clearTemplateFilter())}
    >
      {type === 'page' && <ContextTypeFilter />}
      <OwnerFilter />
      <CreatedDate />
    </FilterWrapper>
  );
};

export default TemplateFilters;
