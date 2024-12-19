import { Box, FormControl, FormLabel, Icon } from '@chakra-ui/react';
import Select, { components } from 'react-select';
import AsyncSelect from 'react-select/async';
// eslint-disable-next-line no-redeclare
import { Option } from '@repo/interfaces';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronDownIcon } from '../CustomIcons';
import ErrorMessage from '../ErrorMessage';

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

export interface SelectInputProps {
  title: string;
  options: Option[];
  selectedOption?: Option | string | number;
  isSearchable?: boolean;
  isInvalid?: boolean;
  showTitleAfterSelect?: boolean;
  width?: string | { [name: string]: string };
  isLoading?: boolean;
  showAsRelative?: boolean;
  defaultInputValue?: string;
  errorMessage?: string;
  // eslint-disable-next-line no-unused-vars
  handleSelect?: (options: Option) => void;
  handleOnMenuScrollToBottom?: () => void;
  // eslint-disable-next-line no-unused-vars
  callBackFunction?: (selectedOption: string) => Promise<Option[]>;
  variant?: 'primary' | 'secondary';
  isAsync?: boolean;
}
function SelectInput(props: SelectInputProps) {
  const {
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
    isInvalid,
    errorMessage,
  } = props;
  const SelectComponent = isAsync ? AsyncSelect : Select;
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    setIsFocused(!!selectedOption);
  };

  // Debounce ref
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounce the promiseOptions function
  const promiseOptions = useCallback(
    (selectedOption: string) => {
      return new Promise<Option[]>((resolve) => {
        if (debounceRef.current) {
          clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(async () => {
          if (callBackFunction && selectedOption.length >= 3) {
            const options = await callBackFunction(selectedOption);
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
    if (!selectedOption) {
      setIsFocused(false);
    }
  }, [selectedOption]);

  return (
    <Box width={width} position="relative" height="full">
      <FormControl isInvalid={isInvalid} position="relative">
        {showTitleAfterSelect && (
          <FormLabel
            height="50px"
            justifyContent="center"
            display="flex"
            alignItems="center"
            position="absolute"
            top={
              isFocused || selectedOption ? '10px' : isInvalid ? '40%' : '50%'
            }
            transform={
              isFocused || selectedOption
                ? 'translateY(-40%) scale(0.85)'
                : 'translateY(-50%)'
            }
            transformOrigin="left top"
            paddingLeft={isFocused || selectedOption ? '20px' : '16px'}
            fontSize={isFocused || selectedOption ? '12px' : '14px'}
            lineHeight={isFocused || selectedOption ? '14.26px' : '16.63px'}
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
              fontWeight: 500,
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
              backgroundColor: isInvalid ? '#FFDCDC' : '#F7F7F7',
              borderColor: isInvalid ? '#FD3C3C' : 'transparent',
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
              fontWeight: 500,
            }),
          }}
          defaultInputValue={defaultInputValue}
          value={
            selectedOption
              ? typeof selectedOption === 'string' ||
                typeof selectedOption === 'number'
                ? options.find((option) => option.value === selectedOption)
                : selectedOption
              : null
          }
          onChange={(selectedOptions) => {
            if (selectedOptions) {
              handleSelect && handleSelect(selectedOptions as Option);
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

        {isInvalid && errorMessage && (
          <ErrorMessage mt="4px">{errorMessage}</ErrorMessage>
        )}
      </FormControl>
    </Box>
  );
}

export default SelectInput;
