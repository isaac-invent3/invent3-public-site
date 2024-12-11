import { Heading, HStack, ModalHeader, VStack } from '@chakra-ui/react';

import SearchInput from '~/lib/components/UI/SearchInput';
import FilterButton from '~/lib/components/UI/Filter/FilterButton';
import { FilterIcon } from '~/lib/components/CustomIcons';
import { BackButton } from '@repo/ui/components';
import { Template } from '~/lib/interfaces/template.interfaces';

interface HeaderProps {
  headerName: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  openFilter: boolean;
  setOpenFilter: () => void;
  selectedTemplate: Template | null;
  setSelectedTemplate: React.Dispatch<React.SetStateAction<Template | null>>;
}
const Header = (props: HeaderProps) => {
  const {
    headerName,
    setSearch,
    openFilter,
    setOpenFilter,
    selectedTemplate,
    setSelectedTemplate,
  } = props;
  return (
    <ModalHeader m={0} p={0} mt="32px" mx="24px">
      <VStack
        width="full"
        spacing={selectedTemplate ? '31px' : '26px'}
        alignItems="flex-start"
      >
        <Heading
          color="primary.500"
          fontWeight={800}
          fontSize="32px"
          lineHeight="38.02px"
        >
          {headerName}
        </Heading>
        {selectedTemplate && (
          <BackButton
            handleClick={() => setSelectedTemplate(null)}
            customStyles={{ mb: '24px' }}
          />
        )}
        {!selectedTemplate && (
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
