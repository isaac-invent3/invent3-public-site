import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
} from '@chakra-ui/react';
import { useField } from 'formik';
import Select, { components } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { Option } from '~/lib/interfaces/general.interfaces';
import { ChevronDownIcon, InfoIcon } from '../CustomIcons';
import { useState } from 'react';

const DropdownIndicator = (props: any) => {
  return (
    <components.DropdownIndicator {...props}>
      <Icon
        as={ChevronDownIcon}
        color="neutral.800"
        boxSize="16px"
        height="50px"
        pb="12px"
      />
    </components.DropdownIndicator>
  );
};

interface SelectInputProps {
  name: string;
  title: string;
  options: Option[];
  isSearchable?: boolean;
  width?: string | { [name: string]: string };
  isLoading?: boolean;
  showAsRelative?: boolean;
  variant?: 'primary' | 'secondary';
  isMulti?: boolean;
}
function SelectInput({
  name,
  title,
  options,
  isSearchable = false,
  width = 'full',
  isLoading,
  variant = 'primary',
  isMulti = false,
}: SelectInputProps) {
  const [field, meta, helpers] = useField(name);
  const SelectComponent = isMulti ? CreatableSelect : Select;
  const [isFocused, setIsFocused] = useState(false);
  const inputValue = meta.value;
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    if (!inputValue) setIsFocused(false);
  };

  return (
    <Box width={width} position="relative" height="full">
      <FormControl
        isInvalid={meta.touched && meta.error !== undefined}
        position="relative"
      >
        <FormLabel
          height="50px"
          justifyContent="center"
          display="flex"
          alignItems="center"
          position="absolute"
          top={isFocused || inputValue ? '10px' : meta.error ? '40%' : '50%'}
          transform={
            isFocused || inputValue
              ? 'translateY(-40%) scale(0.85)'
              : 'translateY(-50%)'
          }
          transformOrigin="left top"
          paddingLeft={isFocused || inputValue ? '20px' : '16px'}
          fontSize={isFocused || inputValue ? '12px' : '14px'}
          lineHeight={isFocused || inputValue ? '14.26px' : '16.63px'}
          color={
            isFocused
              ? variant === 'primary'
                ? 'neutral.600'
                : 'neutral.800'
              : variant === 'primary'
                ? 'neutral.300'
                : 'neutral.700'
          }
          pointerEvents="none"
          transition="all 0.2s ease-in-out"
          zIndex={99}
        >
          {title}
        </FormLabel>
        <SelectComponent
          {...field}
          isSearchable={isSearchable}
          options={options}
          isLoading={isLoading || false}
          isMulti={isMulti}
          onFocus={handleFocus}
          onBlur={handleBlur}
          styles={{
            container: (provided) => ({
              ...provided,
            }),
            control: (provided) => ({
              ...provided,
              height: '50px',
              width: '100%',
              borderRadius: '8px',
              fontSize: '14px',
              lineHeight: '17.07px',
              paddingTop: isFocused || inputValue ? '10px' : '6px',
              ':focus-within': {
                borderColor: 'transparent',
              },
              ':hover': {
                borderColor: 'transparent',
              },
              boxShadow: 'none',
              paddingLeft: '8px',
              backgroundColor:
                meta.error && meta.touched ? '#FFDCDC' : '#F7F7F7',
              borderColor:
                meta.error && meta.touched ? '#FD3C3C' : 'transparent',
            }),
            menu: (provided) => ({
              ...provided,
              marginTop: '2px',
              borderWidth: '0px',
              backgroundColor: '#F7F7F7',
              zIndex: 999,
            }),

            indicatorsContainer: (provided) => ({
              ...provided,
              display: 'hidden',
            }),
            dropdownIndicator: (provided) => ({
              ...provided,
              display: 'hidden',
              padding: 0,
              paddingTop: '0px',
              paddingRight: '16px',
            }),
            placeholder: (provided) => ({
              ...provided,
              display: 'none',
            }),
            option: (provided) => ({
              ...provided,
              color: '#000000',
              marginBottom: '0px',
              paddingTop: '8px',
              paddingLeft: '16px',
              fontSize: '14px',
              lineHeight: '16.63px',
              backgroundColor: '#F7F7F7',
              paddingBottom: '8px',
              '&:hover': {
                backgroundColor: '#F2F1F1',
              },
            }),
            singleValue: (provided) => ({
              ...provided,
              color: 'black',
              fontSize: '14px',
              width: '100%',
              lineHeight: '16.63px',
            }),
          }}
          value={options.find((option) => option.value === meta.value)}
          onChange={(selectedOptions) => {
            if (selectedOptions) {
              if (isMulti) {
                const valuesString = (selectedOptions as Option[])
                  .map((option) => option.label)
                  .join(',');
                helpers.setValue(valuesString);
              } else {
                helpers.setValue((selectedOptions as Option).value);
              }
            }
          }}
          components={{ DropdownIndicator }}
        />

        <FormErrorMessage
          color="error.500"
          fontSize="12px"
          fontWeight={500}
          lineHeight="14.26px"
          mt="4px"
        >
          <Flex width="full" gap="8px">
            <Icon as={InfoIcon} color="error.500" />
            {meta.error}
          </Flex>
        </FormErrorMessage>
      </FormControl>
    </Box>
  );
}

export default SelectInput;
