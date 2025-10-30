import { Switch, Text, VStack } from '@chakra-ui/react';
import { FormInputWrapper } from '@repo/ui/components';
import { useFormikContext } from 'formik';
import moment from 'moment';
import React, { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { CreateTicketForm } from '~/lib/interfaces/ticket.interfaces';
import {
  useGetSLADefinitionsQuery,
  useSearchSLADefinitionMutation,
} from '~/lib/redux/services/settings/sla.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';

const SLAField = ({
  hasSLA,
  setHasSLA,
}: {
  hasSLA: boolean;
  setHasSLA: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { values } = useFormikContext<CreateTicketForm>();
  const [searchTicketType] = useSearchSLADefinitionMutation({});
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading, isFetching } = useGetSLADefinitionsQuery({
    pageSize: DEFAULT_PAGE_SIZE,
    pageNumber,
  });

  const selectedSLA = data?.data?.items.find(
    (item) => item.slaDefinitionId === values.slaDefinitionId
  );

  const slaResponseHours = selectedSLA?.slaResponseHours;
  const now = moment();

  const slaDueDate = moment(now).add(slaResponseHours, 'hours');
  return (
    <VStack width="full" spacing={{ base: '38px', lg: '24px' }}>
      <FormInputWrapper
        sectionMaxWidth="141px"
        customSpacing="24px"
        description="Select the Asset to which this ticket relates to"
        title="SLA Required"
        isRequired={false}
      >
        <Switch
          size="sm"
          isChecked={hasSLA}
          onChange={() => setHasSLA((prev) => !prev)}
        />
      </FormInputWrapper>
      {hasSLA && (
        <FormInputWrapper
          sectionMaxWidth="141px"
          customSpacing="24px"
          description="Select the Asset to which this ticket relates to"
          title="SLA Type"
          isRequired
        >
          <VStack width="full" spacing={2}>
            <GenericAsyncSelect
              selectName="slaDefinitionId"
              selectTitle="SLA"
              data={data}
              labelKey="ticketTypeName"
              valueKey="slaDefinitionId"
              mutationFn={searchTicketType}
              isLoading={isLoading || isFetching}
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
            />
            {values?.slaDefinitionId && selectedSLA && (
              <VStack
                width="full"
                spacing={2}
                boxShadow="0px 4px 4px 0px #00000026"
                bgColor="#F7F7F7"
                alignItems="flex-start"
                rounded="8px"
                py="10px"
                px={4}
              >
                <Text color="neutral.800">Calculated SLA Deadline</Text>
                <Text color="black" fontWeight={700}>
                  {slaDueDate.format('DD/MM/YYYY HH:mm')}
                </Text>
                <Text fontSize="10px" color="blue.500">
                  Based on {selectedSLA?.ticketTypeName} Policy
                </Text>
              </VStack>
            )}
          </VStack>
        </FormInputWrapper>
      )}
    </VStack>
  );
};

export default SLAField;
