import {
  Input,
  InputGroup,
  InputRightElement,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Flex,
  InputLeftElement,
  Icon,
} from '@chakra-ui/react';
import { useField } from 'formik';
import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { InfoIcon } from '../CustomIcons';

interface TextInputProps {
  name: string;
  type: 'text' | 'password' | 'number' | 'date' | 'time' | 'datetime';
  placeholder: string;
  label: string;
  customStyle?: { [key: string]: unknown };
  value?: string | number;
  customLeftElement?: React.ReactNode;
  customRightElement?: React.ReactNode;
  isDisabled?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  name,
  type,
  label,
  customStyle,
  value,
  customLeftElement,
  customRightElement,
  isDisabled = false,
}) => {
  const [field, meta] = useField(name);
  const [show, setShow] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputValue = value || meta.value;
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    if (!value) setIsFocused(false);
  };

  const inputType = type === 'password' ? (show ? 'text' : 'password') : type;

  return (
    <FormControl
      isInvalid={meta.touched && meta.error !== undefined}
      position="relative"
    >
      <InputGroup position="relative">
        {customLeftElement && (
          <InputLeftElement textAlign="center" height="full" mr="16px">
            {customLeftElement}
          </InputLeftElement>
        )}

        <FormLabel
          position="absolute"
          top={isFocused || inputValue ? '10px' : '50%'}
          left={customLeftElement ? '60px' : '16px'}
          transform={
            isFocused || inputValue
              ? 'translateY(-40%) scale(0.85)'
              : 'translateY(-50%)'
          }
          transformOrigin="left top"
          fontSize={isFocused || inputValue ? '12px' : '14px'}
          lineHeight={isFocused || inputValue ? '14.26px' : '16.63px'}
          color={isFocused ? 'neutral.800' : 'neutral.700'}
          pointerEvents="none"
          transition="all 0.2s ease-in-out"
          zIndex={99}
        >
          {label}
        </FormLabel>

        <Input
          {...field}
          name={name}
          id={name}
          isDisabled={isDisabled}
          color={meta.error ? 'error' : 'black'}
          type={inputType}
          position="relative"
          value={value}
          rounded="8px"
          height="50px"
          pt={isFocused || value ? '10px' : '6px'}
          pl={customLeftElement ? '60px' : '16px'}
          pr={customRightElement || type === 'password' ? '36px' : '16px'}
          bgColor="#F7F7F799"
          borderWidth={0}
          fontWeight={500}
          fontSize="14px"
          lineHeight="16.63px"
          onFocus={handleFocus}
          onBlur={handleBlur}
          _invalid={{
            borderColor: 'error.500',
            borderWidth: '1.5px',
            bgColor: 'error.200',
          }}
          _focusVisible={{
            borderColor: 'white',
            borderWidth: '1px',
          }}
          _active={{
            borderColor: 'white',
            borderWidth: '1px',
          }}
          _focus={{
            borderColor: 'none',
          }}
          _disabled={{
            backgroundColor: '#F7F7F7',
          }}
          _placeholder={{
            color: 'netural.700',
          }}
          {...customStyle}
        />
        {type === 'password' && (
          <InputRightElement
            h="100%"
            alignItems="center"
            position="absolute"
            zIndex={9}
          >
            <Icon
              as={show ? FiEyeOff : FiEye}
              onClick={() => setShow((prev) => !prev)}
              size="20px"
              color="primary.500"
              cursor="pointer"
            />
          </InputRightElement>
        )}

        {customRightElement && (
          <InputRightElement textAlign="center" height="full" mr="16px">
            {customRightElement}
          </InputRightElement>
        )}
      </InputGroup>

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
  );
};

export default TextInput;
