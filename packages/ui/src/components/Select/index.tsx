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
import AsyncSelect from 'react-select/async';
import { ChevronDownIcon, InfoIcon } from '../CustomIcons';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Option } from 'src/interfaces/general.interfaces';

const DropdownIndicator = (props: any) => {
  const { pb, ...rest } = props;
  return (
    <components.DropdownIndicator {...rest}>
      <Icon
        as={ChevronDownIcon}
        color="neutral.800"
        boxSize="16px"
        height="50px"
        pb={pb}
      />
    </components.DropdownIndicator>
  );
};

interface SelectInputProps {
  name: string;
  title: string;
  options: Option[];
  selectedOption?: Option;
  isSearchable?: boolean;
  showTitleAfterSelect?: boolean;
  width?: string | { [name: string]: string };
  isLoading?: boolean;
  showAsRelative?: boolean;
  defaultInputValue?: string;
  // eslint-disable-next-line no-unused-vars
  handleSelect?: (options: Option) => void;
  handleOnMenuScrollToBottom?: () => void;
  // eslint-disable-next-line no-unused-vars
  callBackFunction?: (inputValue: string) => Promise<Option[]>;
  variant?: 'primary' | 'secondary';
  isAsync?: boolean;
}
function SelectInput(props: SelectInputProps) {
  const {
    name,
    title,
    options,
    selectedOption,
    isSearchable = false,
    width = 'full',
    isLoading,
    variant = 'primary',
    showTitleAfterSelect = true,
    isAsync = false,
    defaultInputValue,
    handleSelect,
    callBackFunction,
    handleOnMenuScrollToBottom,
  } = props;
  const [field, meta, helpers] = useField(name);
  const SelectComponent = isAsync ? AsyncSelect : Select;
  const [isFocused, setIsFocused] = useState(false);
  const inputValue = meta.value || selectedOption;
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    if (!inputValue) setIsFocused(false);
  };

  // Debounce ref
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounce the promiseOptions function
  const promiseOptions = useCallback(
    (inputValue: string) => {
      return new Promise<Option[]>((resolve) => {
        if (debounceRef.current) {
          clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(async () => {
          if (callBackFunction && inputValue.length >= 3) {
            const options = await callBackFunction(inputValue);
            resolve(options);
          } else {
            resolve([]);
          }
          debounceRef.current = null;
        }, 2000); // Delay of 2000ms
      });
    },
    [callBackFunction]
  );

  useEffect(() => {
    if (!inputValue) {
      setIsFocused(false);
    }
  }, [inputValue]);

  return (
    <Box width={width} position="relative" height="full">
      <FormControl
        isInvalid={meta.touched && meta.error !== undefined}
        position="relative"
      >
        {showTitleAfterSelect && (
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
            zIndex={1}
          >
            {title}
          </FormLabel>
        )}
        <SelectComponent
          {...field}
          isSearchable={isSearchable}
          options={options}
          isLoading={isLoading || false}
          defaultOptions={options}
          loadOptions={promiseOptions}
          onMenuScrollToBottom={handleOnMenuScrollToBottom}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={title}
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
              paddingTop: showTitleAfterSelect ? '10px' : '0px',
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
              display: showTitleAfterSelect ? 'none' : 'flex',
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
          defaultInputValue={defaultInputValue}
          value={
            selectedOption
              ? selectedOption
              : meta.value
                ? options.find((option) => option.value === meta.value)
                : null
          }
          onChange={(selectedOptions) => {
            if (selectedOptions) {
              handleSelect && handleSelect(selectedOptions as Option);
              helpers.setValue((selectedOptions as Option).value);
            }
          }}
          components={{
            DropdownIndicator: (props) => (
              <DropdownIndicator
                {...props}
                pb={showTitleAfterSelect ? '12px' : '0px'}
              />
            ),
          }}
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
