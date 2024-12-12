import { Flex, HStack, StackProps } from '@chakra-ui/react';
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
    <HStack width="full" alignItems="flex-start" spacing={spacing} {...rest}>
      <Flex width="full" maxW={sectionMaxWidth}>
        <FormSectionInfo
          title={title}
          info={description}
          isRequired={isRequired}
        />
      </Flex>

      {children}
    </HStack>
  );
};

export default FormInputWrapper;
