import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from '@chakra-ui/react';
import { FormInputWrapper } from '@repo/ui/components';
import React from 'react';

const CurrentCondition = () => {
  return (
    <FormInputWrapper
      sectionMaxWidth="141px"
      customSpacing="16px"
      description="Choose the asset’s current condition."
      title="CurrentCondition"
      isRequired
    >
      <Slider
        aria-label="custom-slider"
        defaultValue={40}
        min={0}
        max={100}
        step={1}
        size="lg"
        sx={{
          h: '10px',
        }}
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
