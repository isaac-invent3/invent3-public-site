import { Box, HStack, Icon, Text, Tooltip, VStack } from '@chakra-ui/react';
import { FilterButton, FilterDropDown, SearchInput } from '@repo/ui/components';
import useFormatUrl from '~/lib/hooks/useFormatUrl';
import useParseUrlData, {
  findSystemContextDetailById,
} from '~/lib/hooks/useParseUrl';
import { FilterIcon, GridIcon, InfoIcon, ListIcon } from '../../CustomIcons';

interface FilterProps {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const Filters = (props: FilterProps) => {
  const { setSearch } = props;
  const formattedUrl = useFormatUrl();
  const data = useParseUrlData(formattedUrl);

  return (
    <HStack gap="1em" w="full" justifyContent="space-between" mt="1em">
      <HStack alignItems="start" spacing="40px">
        <VStack alignItems="start">
          <HStack>
            <Text size="md" fontWeight={800}>
              System Context
            </Text>

            <Tooltip
              label="Default Plans are automatically added to an asset based on the selected asset type"
              placement="top"
              bgColor="#CADBF2"
              color="blue.500"
              width="181px"
              rounded="4px"
              py="8px"
              px="16px"
              fontSize="12px"
            >
              <HStack justifyContent="center" flexShrink={0}>
                <Icon as={InfoIcon} boxSize="14px" color="blue.500" />
              </HStack>
            </Tooltip>
          </HStack>

          <Text color="neutral.700" size="lg" fontWeight={400}>
            {findSystemContextDetailById(data?.systemContextId)?.displayName ??
              'N/A'}
          </Text>
        </VStack>

        <VStack alignItems="start">
          <HStack>
            <Text size="md" fontWeight={800}>
              System Context Type
            </Text>

            <Tooltip
              label="Default Plans are automatically added to an asset based on the selected asset type"
              placement="top"
              bgColor="#CADBF2"
              color="blue.500"
              width="181px"
              rounded="4px"
              py="8px"
              px="16px"
              fontSize="12px"
            >
              <HStack justifyContent="center" flexShrink={0}>
                <Icon as={InfoIcon} boxSize="14px" color="blue.500" />
              </HStack>
            </Tooltip>
          </HStack>

          <FilterDropDown
            options={[]}
            selectedOptions={[]}
            handleClick={(option) => console.log(option)}
            labelStyles={{
              background: 'none',
              padding: '0px',
              color: '#0366EF !important',
              height: 'auto',
            }}
            chevronStyles={{ display: 'none' }}
          />
        </VStack>
      </HStack>

      <HStack spacing="16px">
        <SearchInput setSearch={setSearch} placeholderText="Search" />

        <FilterButton
          icon={FilterIcon}
          label="Filters"
          handleClick={() => console.log('')}
          isActive={false}
        />

        <HStack>
          <Box
            rounded="4px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgColor="primary.500"
            boxSize="32px"
            cursor="pointer"
          >
            <Icon as={GridIcon} color="white" />
          </Box>

          <Box
            rounded="4px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxSize="32px"
            cursor="pointer"
          >
            <Icon as={ListIcon} color="primary.500" />
          </Box>
        </HStack>
      </HStack>
    </HStack>
  );
};

export default Filters;
