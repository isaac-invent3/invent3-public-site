/* eslint-disable no-unused-vars */
import { FormControl, FormLabel, Flex, Textarea } from '@chakra-ui/react';
import { forwardRef, useEffect, useState } from 'react';
import ErrorMessage from './ErrorMessage';

export interface TextAreaProps {
  name: string;
  placeholder: string;
  label: string;
  maxLength?: number;
  isInvalid: boolean;
  value?: string;
  errorMessage?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  customStyle?: TextAreaProps;
}

const TextAreaInput = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      name,
      label,
      customStyle,
      maxLength,
      value,
      onChange,
      onBlur,
      isInvalid,
      errorMessage,
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(!!value);
      if (onBlur) onBlur(e);
    };

    useEffect(() => {
      setIsFocused(!!value);
    }, [value]);

    return (
      <FormControl isInvalid={isInvalid}>
        <Flex
          direction="column"
          border={isInvalid ? '1px' : 0}
          borderColor={isInvalid ? 'error.500' : '#E1E1E1'}
          rounded="8px"
          position="relative"
          bgColor={isInvalid ? 'error.200' : 'neutral.100'}
        >
          <FormLabel
            position="absolute"
            top={isFocused || value ? '12px' : '0%'}
            transform={
              isFocused || value
                ? 'translateY(-40%) scale(0.85)'
                : 'translateY(50%)'
            }
            transformOrigin="left top"
            fontSize={isFocused || value ? '12px' : '14px'}
            lineHeight={isFocused || value ? '14.26px' : '16.63px'}
            color={isFocused || value ? 'neutral.600' : 'neutral.300'}
            pointerEvents="none"
            transition="all 0.2s ease-in-out"
            zIndex={1}
            px="16px"
          >
            {label}
          </FormLabel>
          <Textarea
            ref={ref}
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
            name={name}
            value={value}
            id={name}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={onChange}
            color={isInvalid ? 'error.500' : 'black1'}
            _placeholder={{
              color: 'neutral.300',
            }}
            rounded="8px"
            resize="none"
            maxLength={maxLength}
            px="16px"
            pb="16px"
            pt={isFocused || value ? '24px' : '16px'}
            fontSize="14px"
            lineHeight="16.63px"
            fontWeight={500}
            {...customStyle}
          />
        </Flex>

        {isInvalid && errorMessage && (
          <ErrorMessage mt="4px">{errorMessage}</ErrorMessage>
        )}
      </FormControl>
    );
  }
);

export default TextAreaInput;
