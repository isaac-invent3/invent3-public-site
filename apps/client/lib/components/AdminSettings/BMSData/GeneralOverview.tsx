import { HStack, VStack } from '@chakra-ui/react';
import React from 'react';
import DetailHeader from '../../UI/DetailHeader';
import { FormTextInput } from '@repo/ui/components';
import SectionWrapper from '../../UserSettings/Common/SectionWrapper';
import FacilitySelect from '../../AssetManagement/AssetForm/GeneralStep/AssetLocation/Modals/SelectInputs/FacilitySelect';

const GeneralOverview = () => {
  return (
    <VStack width="full" alignItems="flex-start" spacing="16px">
      <DetailHeader variant="primary" customStyles={{ size: 'lg' }}>
        General Overview
      </DetailHeader>
      <VStack alignItems="flex-start" spacing="16px" width="full">
        <SectionWrapper
          title="Cost of Energy per kWh"
          subtitle="The unit cost of electricity per kWh depending on the distributing company."
          spacing={{ base: '8px', sm: '24px', lg: '63px' }}
          direction={{ base: 'column', sm: 'row' }}
          sectionInfoStyle={{
            width: { lg: '357px' },
            maxW: { base: '100%', sm: '212px' },
          }}
          subtitleStyle={{ width: '246px' }}
          width="full"
        >
          <HStack spacing="17px">
            <FacilitySelect type="general" />
            <FormTextInput name="cost" type="number" label="Cost per KWh" />
          </HStack>
        </SectionWrapper>
      </VStack>
    </VStack>
  );
};

export default GeneralOverview;
