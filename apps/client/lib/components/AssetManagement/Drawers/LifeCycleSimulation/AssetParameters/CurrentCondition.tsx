import {
  HStack,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FormInputWrapper } from '@repo/ui/components';
import { useFormikContext } from 'formik';
import React from 'react';
import { AssetLifeCycleSimulation } from '~/lib/interfaces/asset/lifeCycle.interfaces';

const CurrentCondition = () => {
  const { setFieldValue, values } =
    useFormikContext<AssetLifeCycleSimulation>();
  return (
    <FormInputWrapper
      sectionMaxWidth="170px"
      customSpacing="16px"
      description="Describe the current state of the asset"
      title="Rate Current Condition"
      isRequired
      spacing={{ base: '24px', lg: '85px' }}
    >
      <VStack width="full" spacing={0}>
        <Slider
          aria-label="custom-slider"
          defaultValue={values?.currentCondition ?? undefined}
          min={0}
          max={100}
          step={1}
          size="lg"
          sx={{
            h: '10px',
          }}
          onChange={(value) => setFieldValue('currentCondition', value)}
        >
          <SliderMark
            value={values?.currentCondition ?? 0}
            textAlign="center"
            color="neutral.700"
            mt="-7"
            ml="-1"
            fontWeight={700}
            fontSize="14px"
          >
            {values?.currentCondition}
          </SliderMark>
          <SliderTrack bg="#F2F1F1" borderRadius="full" h="10px">
            <SliderFilledTrack bg="blue.500" />{' '}
          </SliderTrack>
          <SliderThumb boxSize={4} bg="white" border="4px solid #0366EF" />
        </Slider>
        <HStack width="full" justifyContent="space-between">
          <Text color="neutral.300" size="md">
            0
          </Text>
          <Text color="neutral.300" size="md">
            100
          </Text>
        </HStack>
      </VStack>
    </FormInputWrapper>
  );
};

export default CurrentCondition;
