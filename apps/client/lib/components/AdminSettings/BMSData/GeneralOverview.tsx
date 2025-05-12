import { VStack } from '@chakra-ui/react';
import React from 'react';
import DetailHeader from '../../UI/DetailHeader';
import { FormTextInput } from '@repo/ui/components';
import SectionWrapper from '../../UserSettings/Common/SectionWrapper';

const GeneralOverview = () => {
  return (
    <VStack width="full" alignItems="flex-start" spacing="16px">
      <DetailHeader variant="primary" customStyles={{ size: 'lg' }}>
        General Overview
      </DetailHeader>
      <VStack alignItems="flex-start" spacing="16px" width="full" maxW="60%">
        <SectionWrapper
          title="Cost of Energy per kWh"
          subtitle="The unit cost of electricity per kWh depending on the distributing company."
          sectionInfoWidth="246px"
          spacing={{ base: '8px', sm: '24px' }}
          direction={{ base: 'column', sm: 'row' }}
          sectionInfoStyle={{
            maxW: { base: '100%', sm: '212px' },
            bgColor: 'red',
          }}
          width="full"
          bgColor="green"
          justifyContent="space-between"
        >
          <FormTextInput
            label="Cost per kWh"
            type="number"
            name="minPasswordLengthId"
            customStyle={{ width: '250px' }}
          />
        </SectionWrapper>
      </VStack>
    </VStack>
  );
};

export default GeneralOverview;
