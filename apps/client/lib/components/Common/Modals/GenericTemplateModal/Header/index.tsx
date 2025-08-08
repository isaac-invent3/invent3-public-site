import { Heading, HStack, ModalHeader, VStack } from '@chakra-ui/react';

import { FilterIcon } from '~/lib/components/CustomIcons';
import { BackButton, SearchInput, FilterButton } from '@repo/ui/components';

interface HeaderProps {
  headerName: string;
  setSearch?: React.Dispatch<React.SetStateAction<string>>;
  openFilter: boolean;
  setOpenFilter: () => void;
  setShowDetails?: React.Dispatch<React.SetStateAction<boolean>>;
  showDetails?: boolean;
  hasFilters: boolean;
  searchPlaceholder?: string;
  hideOtherInfoWhenDetailsIsShown?: boolean;
}
const Header = (props: HeaderProps) => {
  const {
    headerName,
    setSearch,
    openFilter,
    setOpenFilter,
    showDetails,
    setShowDetails,
    hasFilters,
    searchPlaceholder,
    hideOtherInfoWhenDetailsIsShown,
  } = props;
  return (
    <ModalHeader
      m={0}
      p={0}
      mt={{ base: '24px', lg: '32px' }}
      mx={{ base: '16px', lg: '24px' }}
    >
      <VStack
        width="full"
        spacing={showDetails ? '31px' : '26px'}
        alignItems="flex-start"
      >
        <Heading
          color="primary.500"
          fontWeight={800}
          size={{ base: 'lg', md: 'xl' }}
        >
          {headerName}
        </Heading>
        {showDetails && (
          <BackButton
            handleClick={() => setShowDetails && setShowDetails(false)}
            customStyles={{ mb: hideOtherInfoWhenDetailsIsShown ? '24px' : 0 }}
          />
        )}
        {(!showDetails ||
          (showDetails && !hideOtherInfoWhenDetailsIsShown)) && (
          <HStack
            spacing="16px"
            width="full"
            pb="8px"
            mb="8px"
            justifyContent={{ base: 'flex-start', md: 'flex-end' }}
            borderBottomWidth="1px"
            borderColor="neutral.300"
            flexWrap="wrap"
          >
            {setSearch && (
              <SearchInput
                setSearch={setSearch}
                placeholderText={searchPlaceholder ?? 'Search'}
                containerStyle={{
                  border: '1px solid #DADFE5',
                  rounded: '8px',
                  overflow: 'hidden',
                }}
              />
            )}
            {hasFilters && (
              <FilterButton
                icon={FilterIcon}
                label="Filters"
                handleClick={setOpenFilter}
                isActive={openFilter}
                border="1px solid #DADFE5"
              />
            )}
          </HStack>
        )}
      </VStack>
    </ModalHeader>
  );
};

export default Header;
