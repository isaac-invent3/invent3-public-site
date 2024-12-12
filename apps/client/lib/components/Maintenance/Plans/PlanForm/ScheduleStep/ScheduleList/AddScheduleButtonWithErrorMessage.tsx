import { Flex, VStack } from '@chakra-ui/react';
import { useField } from 'formik';
import { isArray } from 'lodash';

import { ErrorMessage, FormAddButton } from '@repo/ui/components';

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
        <FormAddButton
          handleClick={() => handleAddSchedule()}
          color="#0366EF"
          customStyle={{ spacing: '8px' }}
          customTextStyle={{ fontWeight: 700 }}
        >
          Add a Schedule
        </FormAddButton>
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
