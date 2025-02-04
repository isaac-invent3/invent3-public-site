import { Flex, Stack, StackProps } from '@chakra-ui/react';
import { FormSectionInfo } from '..';

type FormInputWrapperProps = {
  sectionMaxWidth: string;
  spacing: string;
  title: string;
  description: string;
  isRequired?: boolean;
  children: React.ReactNode;
} & StackProps;

const FormInputWrapper = (props: FormInputWrapperProps) => {
  const {
    sectionMaxWidth,
    spacing,
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
      spacing={{ base: '1em', md: spacing }}
      direction={{ base: 'column', md: 'row' }}
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
