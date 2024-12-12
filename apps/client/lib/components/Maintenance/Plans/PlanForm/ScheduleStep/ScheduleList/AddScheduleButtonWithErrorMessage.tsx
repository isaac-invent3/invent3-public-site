import { Flex, VStack } from '@chakra-ui/react';
import { useField } from 'formik';
import { isArray } from 'lodash';

import ErrorMessage from '~/lib/components/UI/ErrorMessage';
import AddButton from '~/lib/components/UI/Form/FormAddButton';

interface AddScheduleButtonWithErrorMessageProps {
  handleAddSchedule: () => void;
}
const AddScheduleButtonWithErrorMessage = (
  props: AddScheduleButtonWithErrorMessageProps
) => {
  const { handleAddSchedule } = props;
  // eslint-disable-next-line no-unused-vars
  const [field, meta, helpers] = useField('schedules');
  return (
    <VStack width="full" alignItems="flex-start">
      <Flex width="full" justifyContent="center">
        <AddButton
          handleClick={() => handleAddSchedule()}
          color="#0366EF"
          customStyle={{ spacing: '8px' }}
          customTextStyle={{ fontWeight: 700 }}
        >
          Add a Schedule
        </AddButton>
      </Flex>
      {meta.touched && meta.error !== undefined && (
        <VStack width="full">
          {isArray(meta.error) &&
            meta.error?.map((scheduleError: { [name: string]: string }) =>
              Object.entries(scheduleError).map(([key, message]) => (
                <ErrorMessage key={key}>{message}</ErrorMessage>
              ))
            )}
        </VStack>
      )}
    </VStack>
  );
};

export default AddScheduleButtonWithErrorMessage;
