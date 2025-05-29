import { IconProps } from '@chakra-ui/icons';
import { ComponentWithAs, HStack, Icon, Text } from '@chakra-ui/react';
import { Option } from '@repo/interfaces';
import { FilterDropDown } from '@repo/ui/components';
import React from 'react';
import { ChevronDownIcon } from '~/lib/components/CustomIcons';

interface SingleLocationDropdownProps {
  isLoading: boolean;
  icon: ComponentWithAs<'svg', IconProps>;
  options: Option[];
  selectedOption: Option | null;
  // eslint-disable-next-line no-unused-vars
  handleClick: (option: Option) => void;
  label: string;
}

const SingleLocationDropdown = (props: SingleLocationDropdownProps) => {
  const { label, options, isLoading, icon, selectedOption, handleClick } =
    props;
  return (
    <FilterDropDown
      options={options}
      hasMoreOptions={false}
      loadMoreOptions={() => {}}
      isLoading={isLoading}
      labelStyles={{ minW: '200px', p: '16px' }}
      customLabel={
        <HStack spacing="16px" width="full" justifyContent="space-between">
          <HStack spacing="12px">
            <HStack spacing="8px">
              <Icon as={icon} boxSize="20px" />
              <Text
                color="neutral.800"
                fontWeight={800}
                fontSize="16px"
                lineHeight="16px"
              >
                {label}:
              </Text>
            </HStack>
            <Text
              color="neutral.600"
              fontWeight={700}
              fontSize="14px"
              lineHeight="16px"
            >
              {selectedOption?.label ?? '----'}
            </Text>
          </HStack>
          <Icon as={ChevronDownIcon} boxSize="16px" />
        </HStack>
      }
    >
      {options.map((item, index) => (
        <Text
          key={index}
          width="full"
          cursor="pointer"
          py="4px"
          onClick={() => {
            handleClick(item);
          }}
        >
          {item.label}
        </Text>
      ))}
    </FilterDropDown>
  );
};

export default SingleLocationDropdown;
