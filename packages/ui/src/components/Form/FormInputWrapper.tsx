import { Flex, Stack, StackProps } from '@chakra-ui/react';
import { FormSectionInfo } from '..';

type FormInputWrapperProps = {
  sectionMaxWidth: string;
  customSpacing: string;
  title: string;
  description: string;
  isRequired?: boolean;
  children: React.ReactNode;
} & StackProps;

const FormInputWrapper = (props: FormInputWrapperProps) => {
  const {
    sectionMaxWidth,
    customSpacing,
    title,
    description,
    children,
    isRequired = false,
    ...rest
  } = props;

  return (
    <Stack
      width="full"
      alignItems="flex-start"
      spacing={{ base: '1em', lg: customSpacing }}
      direction={{ base: 'column', lg: 'row' }}
      {...rest}
    >
      <Flex width="full" maxW={{ base: 'auto', md: sectionMaxWidth }}>
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
