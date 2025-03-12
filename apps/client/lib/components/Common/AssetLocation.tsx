import { Text } from '@chakra-ui/react';
import { FormInputWrapper } from '@repo/ui/components';

interface AssetLocationProps {
  value: string | null;
}
const AssetLocation = (props: AssetLocationProps) => {
  const { value } = props;

  return (
    <FormInputWrapper
      title="Asset Location"
      description="Specify where the asset is located"
      isRequired
      sectionMaxWidth="130px"
      customSpacing="56px"
    >
      <Text
        color="black"
        bgColor="neutral.100"
        minH="96px"
        width="full"
        rounded="8px"
        py="8px"
        px="11px"
      >
        {value}
      </Text>
    </FormInputWrapper>
  );
};

export default AssetLocation;
