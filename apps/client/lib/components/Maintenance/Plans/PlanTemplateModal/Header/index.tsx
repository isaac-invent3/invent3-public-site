import { Heading, HStack, ModalHeader, VStack } from '@chakra-ui/react';
import React from 'react';
import SearchInput from '~/lib/components/UI/SearchInput';
import FilterButton from '~/lib/components/UI/Filter/FilterButton';
import { FilterIcon } from '~/lib/components/CustomIcons';
import { MaintenancePlan } from '~/lib/interfaces/maintenance.interfaces';
import BackButton from '~/lib/components/UI/Button/BackButton';

interface HeaderProps {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  openFilter: boolean;
  setOpenFilter: () => void;
  selectedPlan: MaintenancePlan | null;
  setSelectedPlan: React.Dispatch<React.SetStateAction<MaintenancePlan | null>>;
}
const Header = (props: HeaderProps) => {
  const {
    setSearch,
    openFilter,
    setOpenFilter,
    selectedPlan,
    setSelectedPlan,
  } = props;
  return (
    <ModalHeader m={0} p={0} mt="32px" mx="24px">
      <VStack
        width="full"
        spacing={selectedPlan ? '31px' : '26px'}
        alignItems="flex-start"
      >
        <Heading
          color="primary.500"
          fontWeight={800}
          fontSize="32px"
          lineHeight="38.02px"
        >
          Plan Templates
        </Heading>
        {selectedPlan && (
          <BackButton
            handleClick={() => setSelectedPlan(null)}
            customStyles={{ mb: '24px' }}
          />
        )}
        {!selectedPlan && (
          <HStack
            spacing="16px"
            width="full"
            pb="8px"
            mb="8px"
            justifyContent="flex-end"
            borderBottomWidth="1px"
            borderColor="neutral.300"
          >
            <SearchInput
              setSearch={setSearch}
              placeholderText="Search"
              containerStyle={{
                border: '1px solid #DADFE5',
                rounded: '8px',
                overflow: 'hidden',
              }}
            />
            <FilterButton
              icon={FilterIcon}
              label="Filters"
              handleClick={setOpenFilter}
              isActive={openFilter}
              border="1px solid #DADFE5"
            />
          </HStack>
        )}
      </VStack>
    </ModalHeader>
  );
};

export default Header;
