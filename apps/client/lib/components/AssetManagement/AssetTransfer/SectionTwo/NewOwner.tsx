import { VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import DetailHeader from '~/lib/components/UI/DetailHeader';
import EmployeeSelect from '../../../Common/EmployeeSelect';
import { Employee } from '~/lib/interfaces/user.interfaces';
import { useGetEmployeeByIdQuery } from '~/lib/redux/services/employees.services';
import User from '../../Common/User';

const NewOwner = () => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [user, setUser] = useState<Employee | null>(null);
  const { data } = useGetEmployeeByIdQuery(selectedUserId, {
    skip: !selectedUserId,
  });

  useEffect(() => {
    if (data?.data) {
      setUser(data?.data);
    }
  }, [data]);

  return (
    <VStack
      spacing="16px"
      alignItems="flex-start"
      width="full"
      height="max-content"
    >
      <DetailHeader variant="secondary">New Owner</DetailHeader>
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
        />
      )}
    </VStack>
  );
};

export default NewOwner;
