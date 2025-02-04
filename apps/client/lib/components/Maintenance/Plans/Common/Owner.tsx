import { VStack } from '@chakra-ui/react';
import { ErrorMessage, FormInputWrapper } from '@repo/ui/components';
import { useField } from 'formik';
import { useState } from 'react';
import UserDisplayAndAddButton from '~/lib/components/Common/UserDisplayAndAddButton';
import { Option } from '~/lib/interfaces/general.interfaces';

interface OwnerProps {
  sectionMaxWidth: string;
  spacing: string;
  defaultName?: string | null;
}
const Owner = (props: OwnerProps) => {
  const { sectionMaxWidth, spacing, defaultName } = props;
  // eslint-disable-next-line no-unused-vars
  const [field, meta, helpers] = useField('ownerId');
  const [selectedUser, setSelectedUser] = useState<Option | null>(null);

  return (
    <FormInputWrapper
      sectionMaxWidth={sectionMaxWidth}
      spacing={spacing}
      title="Owner"
      description="Identify the person responsible for this plan"
      isRequired
    >
      <VStack width="full" spacing="4px" alignItems="flex-start">
        <UserDisplayAndAddButton
          selectedUser={selectedUser?.label ?? defaultName}
          sectionInfoText="Choose a contact or enter an email address. You can also assign a task to yourself."
          handleSelectUser={(user) => {
            helpers.setValue(user?.value);
            setSelectedUser(user);
          }}
        />
        {meta.touched && meta.error !== undefined && (
          <ErrorMessage>{meta.error}</ErrorMessage>
        )}
      </VStack>
    </FormInputWrapper>
  );
};

export default Owner;
