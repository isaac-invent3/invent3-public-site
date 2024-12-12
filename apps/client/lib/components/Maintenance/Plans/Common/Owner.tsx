import { Flex, HStack, VStack } from '@chakra-ui/react';
import { useField } from 'formik';
import React, { useState } from 'react';
import UserDisplayAndAddButton from '~/lib/components/Common/UserDisplayAndAddButton';
import { ErrorMessage, FormSectionInfo } from '@repo/ui/components';
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
    <HStack width="full" alignItems="flex-start" spacing={spacing}>
      <Flex width="full" maxW={sectionMaxWidth}>
        <FormSectionInfo
          title="Owner"
          info="Add name that users can likely search with"
          isRequired
        />
      </Flex>
      <VStack width="full" spacing="4px" alignItems="flex-start">
        <UserDisplayAndAddButton
          selectedUser={selectedUser?.label ?? defaultName}
          handleSelectUser={(user) => {
            helpers.setValue(user?.value);
            setSelectedUser(user);
          }}
        />
        {meta.touched && meta.error !== undefined && (
          <ErrorMessage>{meta.error}</ErrorMessage>
        )}
      </VStack>
    </HStack>
  );
};

export default Owner;
