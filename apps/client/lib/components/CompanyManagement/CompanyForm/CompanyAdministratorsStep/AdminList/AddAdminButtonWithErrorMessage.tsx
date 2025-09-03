import { Flex, VStack } from '@chakra-ui/react';
import { useField } from 'formik';
import { isArray } from 'lodash';

import { ErrorMessage, FormAddButton } from '@repo/ui/components';

interface AddAdminButtonWithErrorMessageProps {
  handleAddAdmin: () => void;
}
const AddAdminButtonWithErrorMessage = (
  props: AddAdminButtonWithErrorMessageProps
) => {
  const { handleAddAdmin } = props;
  // eslint-disable-next-line no-unused-vars
  const [field, meta, helpers] = useField('admins');
  return (
    <VStack width="full" alignItems="flex-start">
      <Flex width="full" justifyContent="center">
        <FormAddButton
          handleClick={() => handleAddAdmin()}
          color="#0366EF"
          customStyle={{ spacing: '8px' }}
          customTextStyle={{ fontWeight: 700 }}
        >
          Add New Administrator
        </FormAddButton>
      </Flex>
      {meta.touched && meta.error !== undefined && (
        <VStack width="full">
          {isArray(meta.error) &&
            meta.error?.map((adminError: { [name: string]: string }) =>
              Object.entries(adminError).map(([key, message]) => (
                <ErrorMessage key={key}>{message}</ErrorMessage>
              ))
            )}
        </VStack>
      )}
    </VStack>
  );
};

export default AddAdminButtonWithErrorMessage;
