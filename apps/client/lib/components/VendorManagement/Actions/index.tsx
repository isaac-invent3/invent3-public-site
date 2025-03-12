import { HStack, Icon } from '@chakra-ui/react';

import { Button, FilterButton } from '@repo/ui/components';
import {
  BulkSearchIcon,
  DownloadIcon,
  FilterIcon,
} from '~/lib/components/CustomIcons';

interface ActionButtonProps {
  activeAction: 'bulk' | 'filter' | null;
  setActiveAction: React.Dispatch<
    React.SetStateAction<'bulk' | 'filter' | null>
  >;
}
const ActionButton = (props: ActionButtonProps) => {
  const { activeAction, setActiveAction } = props;

  return (
    <HStack spacing="16px" flexWrap='wrap'>
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
      <Button
        customStyles={{
          minH: '36px',
          p: '0px',
          px: '8px',
          width: '100px',
          justifyContent: 'flex-start',
        }}
      >
        <Icon as={DownloadIcon} boxSize="24px" mr="8px" />
        Export
      </Button>
    </HStack>
  );
};

export default ActionButton;
