import { VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import DetailHeader from '~/lib/components/UI/DetailHeader';
import UserSelect from '../../../Common/SelectComponents/UserSelect';
import UserDisplay from '../../Common/User';
import { useField } from 'formik';
import { useGetUserByIdQuery } from '~/lib/redux/services/user.services';
import { User } from '~/lib/interfaces/user.interfaces';

interface NewOwnerProps {
  setNewLocation: React.Dispatch<React.SetStateAction<string>>;
}
const NewOwner = (props: NewOwnerProps) => {
  const { setNewLocation } = props;
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const { data } = useGetUserByIdQuery(
    { userId: selectedUserId! },
    {
      skip: !selectedUserId,
    }
  );
  // eslint-disable-next-line no-unused-vars
  const [field, meta, helpers] = useField('transferredTo');

  useEffect(() => {
    if (data?.data) {
      setUser(data?.data);
      helpers.setValue(data?.data?.locationId);
      if (data?.data?.userLocation) {
        setNewLocation(data?.data?.userLocation);
      }
    }
  }, [data]);

  return (
    <VStack
      spacing="16px"
      alignItems="flex-start"
      width="full"
      height="max-content"
    >
      <DetailHeader
        variant="secondary"
        customStyles={{ size: { base: 'md', md: 'lg' }, fontWeight: 700 }}
      >
        New Owner
      </DetailHeader>
      <UserSelect
        selectName="newOwnerId"
        selectTitle="User"
        handleSelect={(option) => setSelectedUserId(option.value as number)}
      />
      {user && (
        <UserDisplay
          name={user.firstName + ' ' + user.lastName}
          role={
            user?.userRoles
              ? user?.userRoles?.map((item) => item.roleName).join(', ')
              : ''
          }
          location={user?.userLocation}
          department={null}
          minWidth="100px"
        />
      )}
    </VStack>
  );
};

export default NewOwner;
