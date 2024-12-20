import { VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import DetailHeader from '~/lib/components/UI/DetailHeader';
import EmployeeSelect from '../../../Common/EmployeeSelect';
import { Employee } from '~/lib/interfaces/user.interfaces';
import { useGetEmployeeByIdQuery } from '~/lib/redux/services/employees.services';
import User from '../../Common/User';
import { useField } from 'formik';

interface NewOwnerProps {
  setNewLocation: React.Dispatch<React.SetStateAction<string>>;
}
const NewOwner = (props: NewOwnerProps) => {
  const { setNewLocation } = props;
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [user, setUser] = useState<Employee | null>(null);
  const { data } = useGetEmployeeByIdQuery(
    { id: selectedUserId ?? undefined },
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
      if (data?.data?.locationId) {
        setNewLocation(data?.data?.locationId?.toString());
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
      <DetailHeader variant="secondary" customStyles={{ fontWeight: 700 }}>
        New Owner
      </DetailHeader>
      <EmployeeSelect
        selectName="newOwnerId"
        selectTitle="User"
        handleSelect={(option) => setSelectedUserId(option.value as number)}
      />
      {user && (
        <User
          name={user.employeeName}
          role="Operation Manager"
          location={null}
          department={null}
          minWidth="100px"
        />
      )}
    </VStack>
  );
};

export default NewOwner;
