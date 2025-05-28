import { HStack } from '@chakra-ui/react';

import { FilterButton } from '@repo/ui/components';
import { BulkSearchIcon, FilterIcon } from '~/lib/components/CustomIcons';
import { useAppSelector } from '~/lib/redux/hooks';
import useExport from '~/lib/hooks/useExport';

interface ActionButtonProps {
  activeAction: 'bulk' | 'filter' | null;
  setActiveAction: React.Dispatch<
    React.SetStateAction<'bulk' | 'filter' | null>
  >;
}
const ActionButton = (props: ActionButtonProps) => {
  const { activeAction, setActiveAction } = props;
  const selectedIds = useAppSelector((state) => state.common.selectedTableIds);
  const { ExportPopover } = useExport({
    ids: selectedIds,
    exportTableName: 'Users',
    tableDisplayName: 'user',
  });

  return (
    <HStack spacing={{ base: '8px', md: '16px' }} flexWrap="wrap">
      <FilterButton
        icon={BulkSearchIcon}
        label="Bulk Actions"
        handleClick={() =>
          setActiveAction((prev) => (prev === 'bulk' ? null : 'bulk'))
        }
        isActive={activeAction === 'bulk'}
      />
      <FilterButton
        icon={FilterIcon}
        label="Filters"
        handleClick={() =>
          setActiveAction((prev) => (prev === 'filter' ? null : 'filter'))
        }
        isActive={activeAction === 'filter'}
      />
      {ExportPopover}
    </HStack>
  );
};

export default ActionButton;
