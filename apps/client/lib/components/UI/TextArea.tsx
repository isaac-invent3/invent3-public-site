import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Flex,
  Textarea,
  Icon,
} from '@chakra-ui/react';
import { useField } from 'formik';
import { useState } from 'react';
import { InfoIcon } from '../CustomIcons';

interface TextAreaProps {
  name: string;
  placeholder: string;
  label: string;
  maxLength?: number;
  customStyle?: { [key: string]: any };
}

const TextareaInput = ({
  name,
  label,
  customStyle,
  maxLength,
}: TextAreaProps) => {
  const [field, meta] = useField(name);
  const [isFocused, setIsFocused] = useState(false);
  const inputValue = meta.value;
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    if (!inputValue) setIsFocused(false);
  };

  return (
    <FormControl isInvalid={meta.touched && meta.error !== undefined}>
      <Flex
        direction="column"
        border={meta.touched && meta.error ? '1px' : 0}
        borderColor={meta.touched && meta.error ? 'error.500' : '#E1E1E1'}
        rounded="8px"
        position="relative"
        bgColor={meta.touched && meta.error ? 'error.200' : 'neutral.100'}
      >
        <FormLabel
          position="absolute"
          top={isFocused || inputValue ? '12px' : '0%'}
          transform={
            isFocused || inputValue
              ? 'translateY(-40%) scale(0.85)'
              : 'translateY(50%)'
          }
          transformOrigin="left top"
          fontSize={isFocused || inputValue ? '12px' : '14px'}
          lineHeight={isFocused || inputValue ? '14.26px' : '16.63px'}
          color={isFocused || inputValue ? 'neutral.600' : 'neutral.300'}
          pointerEvents="none"
          transition="all 0.2s ease-in-out"
          zIndex={99}
          px="16px"
        >
          {label}
        </FormLabel>
        <Textarea
          border="none"
          _invalid={{
            borderColor: 'none',
            boxShadow: 'none',
          }}
          _focus={{
            borderColor: 'none',
          }}
          _focusVisible={{
            borderColor: 'none',
          }}
          height="full"
          {...field}
          name={name}
          id={name}
          onFocus={handleFocus}
          onBlur={handleBlur}
          color={meta.error ? 'error.500' : 'black1'}
          _placeholder={{
            color: 'neutral.300',
          }}
          rounded="8px"
          resize="none"
          maxLength={maxLength}
          px="16px"
          pb="16px"
          pt={isFocused || inputValue ? '24px' : '16px'}
          fontSize="14px"
          {...customStyle}
        />
      </Flex>

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

export default TextareaInput;
