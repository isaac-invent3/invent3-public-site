import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
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
      sectionMaxWidth="141px"
      customSpacing="16px"
      description="Choose the asset’s current condition."
      title="Current Condition"
      isRequired
    >
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
        <SliderTrack bg="#F2F1F1" borderRadius="full" h="10px">
          <SliderFilledTrack bg="blue.500" />{' '}
        </SliderTrack>
        <SliderThumb
          boxSize={4}
          bg="blue.500"
          border="2px solid white"
          _hover={{ bg: 'blue.500' }}
        />
      </Slider>
    </FormInputWrapper>
  );
};

export default CurrentCondition;
