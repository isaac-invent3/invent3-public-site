import { Flex, HStack } from '@chakra-ui/react';
import SectionInfo from '~/lib/components/UI/Form/FormSectionInfo';

interface FormInputWrapperContainerProps {
  sectionMaxWidth: string;
  spacing: string;
  title: string;
  description: string;
  isRequired?: boolean;
  children: React.ReactNode;
}

const FormInputWrapperContainer = (props: FormInputWrapperContainerProps) => {
  const {
    sectionMaxWidth,
    spacing,
    title,
    description,
    children,
    isRequired = false,
  } = props;

  return (
    <HStack width="full" alignItems="flex-start" spacing={spacing}>
      <Flex width="full" maxW={sectionMaxWidth}>
        <SectionInfo title={title} info={description} isRequired={isRequired} />
      </Flex>

      {children}
    </HStack>
  );
};

export default FormInputWrapperContainer;
