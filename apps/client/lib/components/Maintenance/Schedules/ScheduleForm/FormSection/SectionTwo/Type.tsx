import { Flex, HStack, VStack } from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';
import SelectableButtonGroup from '~/lib/components/UI/Button/SelectableButtonGroup';
import ErrorMessage from '~/lib/components/UI/ErrorMessage';
import SectionInfo from '~/lib/components/UI/Form/FormSectionInfo';
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
  const { data } = useGetAllMaintenanceTypeQuery({
    pageSize: DEFAULT_PAGE_SIZE,
  });

  const dispatch = useAppDispatch();
  // eslint-disable-next-line no-unused-vars
  const [field, meta, helpers] = useField('typeId');
  return (
    <HStack width="full" alignItems="flex-start" spacing={spacing}>
      <Flex width="full" maxW={sectionMaxWidth}>
        <SectionInfo
          title="Type"
          info="Add name that users can likely search with"
          isRequired
        />
      </Flex>
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
        />
        {meta.touched && meta.error !== undefined && (
          <ErrorMessage>{meta.error}</ErrorMessage>
        )}
      </VStack>
    </HStack>
  );
};

export default Type;
