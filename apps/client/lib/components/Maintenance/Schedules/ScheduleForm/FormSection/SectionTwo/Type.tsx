import { VStack } from '@chakra-ui/react';
import { useField } from 'formik';

import {
  ErrorMessage,
  FormInputWrapper,
  SelectableButtonGroup,
} from '@repo/ui/components';
import { useAppDispatch } from '~/lib/redux/hooks';
import { useGetAllMaintenanceTypeQuery } from '~/lib/redux/services/maintenance/type.services';
import { updateScheduleForm } from '~/lib/redux/slices/MaintenanceSlice';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { generateOptions } from '~/lib/utils/helperFunctions';

interface TypeProps {
  sectionMaxWidth: string;
  spacing: string;
  buttonVariant: 'secondary' | 'outline';
}
const Type = (props: TypeProps) => {
  const { sectionMaxWidth, spacing, buttonVariant } = props;
  const { data, isLoading } = useGetAllMaintenanceTypeQuery({
    pageSize: DEFAULT_PAGE_SIZE,
  });

  const dispatch = useAppDispatch();
  // eslint-disable-next-line no-unused-vars
  const [field, meta, helpers] = useField('typeId');
  return (
    <FormInputWrapper
      sectionMaxWidth={sectionMaxWidth}
      customSpacing={spacing}
      title="Type"
      description="Select the maintenance type from the options."
      isRequired
    >
      <VStack width="full" alignItems="flex-start">
        <SelectableButtonGroup
          options={generateOptions(
            data?.data.items,
            'typeName',
            'maintenanceTypeId'
          )}
          selectedOptions={[{ value: meta.value, label: meta.value }]}
          handleSelect={(options) => {
            helpers.setValue(options[0]?.value);
            dispatch(updateScheduleForm({ typeName: options[0]?.label }));
          }}
          isMultiSelect={false}
          buttonVariant={buttonVariant}
          customButtonStyle={{ width: 'max-content' }}
          isLoading={isLoading}
        />
        {meta.touched && meta.error !== undefined && (
          <ErrorMessage>{meta.error}</ErrorMessage>
        )}
      </VStack>
    </FormInputWrapper>
  );
};

export default Type;
