import { Flex, FlexProps, Stack, StackProps } from '@chakra-ui/react';
import { FormSectionInfo } from '..';

type FormInputWrapperProps = {
  sectionMaxWidth: string;
  customSpacing?: string;
  title: string;
  description: string;
  isRequired?: boolean;
  children: React.ReactNode;
  formSectionCustomStyle?: FlexProps;
} & StackProps;

const FormInputWrapper = (props: FormInputWrapperProps) => {
  const {
    sectionMaxWidth,
    customSpacing,
    title,
    description,
    children,
    formSectionCustomStyle,
    isRequired = false,
    ...rest
  } = props;

  return (
    <Stack
      width="full"
      alignItems="flex-start"
      spacing={{ base: '1em', lg: customSpacing ?? '24px' }}
      direction={{ base: 'column', lg: 'row' }}
      {...rest}
    >
      <Flex
        width="full"
        maxW={{ base: 'auto', md: sectionMaxWidth }}
        {...formSectionCustomStyle}
      >
        <FormSectionInfo
          title={title}
          info={description}
          isRequired={isRequired}
        />
      </Flex>

      {children}
    </Stack>
  );
};

export default FormInputWrapper;
