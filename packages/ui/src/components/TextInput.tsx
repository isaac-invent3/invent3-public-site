import {
  Input,
  InputGroup,
  InputRightElement,
  FormControl,
  FormLabel,
  InputLeftElement,
  Icon,
  InputProps,
  FormControlProps,
} from '@chakra-ui/react';
import { useState, forwardRef } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import ErrorMessage from './ErrorMessage';

export interface TextInputProps {
  name: string;
  type: React.HTMLInputTypeAttribute;
  label: string;
  value?: string | number;
  placeholder?: string;
  customStyle?: InputProps;
  formControlWrapperStyles?: FormControlProps;
  customLeftElement?: React.ReactNode;
  customRightElement?: React.ReactNode;
  leftElementWidth?: string;
  isDisabled?: boolean;
  variant?: 'primary' | 'secondary';
  showTitleAfterContent?: boolean;
  errorMessage?: string;
  isInvalid?: boolean;
  // eslint-disable-next-line no-unused-vars
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // eslint-disable-next-line no-unused-vars
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  showErrorMessage?: boolean;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  const {
    name,
    type,
    label,
    value,
    placeholder,
    customStyle,
    customLeftElement,
    customRightElement,
    leftElementWidth,
    isDisabled = false,
    variant = 'primary',
    errorMessage,
    isInvalid = false,
    onChange,
    onBlur,
    onFocus,
    formControlWrapperStyles,
    showTitleAfterContent = true,
    showErrorMessage = true,
  } = props;

  const [show, setShow] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputType = type === 'password' ? (show ? 'text' : 'password') : type;

  const handleFocus = () => {
    setIsFocused(true);
    if (onFocus) onFocus();
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  return (
    <FormControl isInvalid={isInvalid} {...formControlWrapperStyles}>
      <InputGroup flex={1}>
        {customLeftElement && (
          <InputLeftElement textAlign="center" height="full">
            {customLeftElement}
          </InputLeftElement>
        )}

        {showTitleAfterContent && (
          <FormLabel
            position="absolute"
            top={isFocused || value || value === 0 ? '10px' : '50%'}
            left={customLeftElement ? (leftElementWidth ?? '16px') : '16px'}
            transform={
              isFocused || value || value === 0
                ? 'translateY(-40%) scale(0.85)'
                : 'translateY(-50%)'
            }
            transformOrigin="left top"
            fontSize={isFocused || value || value === 0 ? '12px' : '14px'}
            lineHeight={
              isFocused || value || value === 0 ? '14.26px' : '16.63px'
            }
            color={
              isFocused || value
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
            {placeholder ? (isFocused || value ? label : placeholder) : label}
          </FormLabel>
        )}

        <Input
          ref={ref}
          name={name}
          type={inputType}
          value={value ?? ''}
          isDisabled={isDisabled}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          color={isInvalid ? 'error' : 'black'}
          position="relative"
          rounded="8px"
          height="50px"
          pt={(isFocused || value) && showTitleAfterContent ? '10px' : '6px'}
          pl={customLeftElement ? (leftElementWidth ?? '16px') : '16px'}
          pr={customRightElement || type === 'password' ? '36px' : '16px'}
          bgColor={variant === 'primary' ? 'neutral.100' : '#F7F7F799'}
          borderWidth={0}
          fontWeight={500}
          fontSize="14px"
          lineHeight="16.63px"
          overflow="hidden"
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
            backgroundColor: 'neutral.100',
          }}
          _placeholder={{
            color: 'netural.700',
          }}
          placeholder={!showTitleAfterContent ? placeholder : undefined}
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
          <InputRightElement
            textAlign="center"
            height="full"
            mr="4px"
            position="absolute"
            zIndex={999}
          >
            {customRightElement}
          </InputRightElement>
        )}
      </InputGroup>

      {isInvalid && errorMessage && showErrorMessage && (
        <ErrorMessage mt="4px">{errorMessage}</ErrorMessage>
      )}
    </FormControl>
  );
});

export default TextInput;
