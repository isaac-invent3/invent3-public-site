import { Flex, VStack } from '@chakra-ui/react';

import { FormAddButton } from '@repo/ui/components';

interface AddFacilityButtonWithErrorMessageProps {
  handleAddFacility: () => void;
}
const AddFacilityButtonWithErrorMessage = (
  props: AddFacilityButtonWithErrorMessageProps
) => {
  const { handleAddFacility } = props;
  return (
    <VStack width="full" alignItems="flex-start">
      <Flex width="full" justifyContent="center">
        <FormAddButton
          handleClick={() => handleAddFacility()}
          color="#0366EF"
          customStyle={{ spacing: '8px' }}
          customTextStyle={{ fontWeight: 700 }}
        >
          Add Another Facility
        </FormAddButton>
      </Flex>
    </VStack>
  );
};

export default AddFacilityButtonWithErrorMessage;
