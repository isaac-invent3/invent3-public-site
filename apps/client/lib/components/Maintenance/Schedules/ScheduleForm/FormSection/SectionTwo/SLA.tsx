import { Flex, HStack } from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';
import { SelectableButtonGroup } from '@repo/ui/components';
import SectionInfo from '~/lib/components/UI/Form/FormSectionInfo';

const staticSLA = [
  {
    label: '2 hours',
    value: 2,
  },
  {
    label: '10 hours',
    value: 10,
  },
  {
    label: '1 day',
    value: 1,
  },
];

interface ServiceLevelAgreementProps {
  sectionMaxWidth: string;
  spacing: string;
  buttonVariant: 'secondary' | 'outline';
}
const ServiceLevelAgreement = (props: ServiceLevelAgreementProps) => {
  const { sectionMaxWidth, spacing, buttonVariant } = props;
  // eslint-disable-next-line no-unused-vars
  const [field, meta, helpers] = useField('sla');
  return (
    <HStack width="full" alignItems="flex-start" spacing={spacing}>
      <Flex width="full" maxW={sectionMaxWidth}>
        <SectionInfo
          title="Service Level Agreement"
          info="Add name that users can likely search with"
          isRequired
        />
      </Flex>
      <SelectableButtonGroup
        options={staticSLA}
        selectedOptions={[{ value: meta.value, label: meta.value }]}
        handleSelect={(options) => {
          helpers.setValue(options[0]?.value);
        }}
        isMultiSelect={false}
        buttonVariant={buttonVariant}
        customButtonStyle={{ width: 'max-content' }}
      />
    </HStack>
  );
};

export default ServiceLevelAgreement;
