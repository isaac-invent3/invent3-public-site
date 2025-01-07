import { Flex, HStack, SimpleGrid } from '@chakra-ui/react';
import { Field } from 'formik';
import { useState } from 'react';
import DimensionDropDown from './DimensionDropDown';
import { FormSectionInfo, FormTextInput } from '@repo/ui/components';

const sampleDimensions = [
  { value: 'kg', label: 'Kg' },
  { value: 'cm', label: 'Cm' },
  { value: 'ft', label: 'Ft' },
];
const AssetDimension = () => {
  const [dimensions, setDimensions] = useState({
    weight: 'Kg',
    width: 'Cm',
    height: 'Cm',
    length: 'Cm',
  });
  return (
    <HStack
      width="full"
      alignItems="flex-start"
      spacing="104px"
      position="relative"
    >
      <Flex width="full" maxW="118px">
        <FormSectionInfo
          title="Dimension"
          info="Enter the size or measurements of the asset."
          isRequired
        />
      </Flex>
      <SimpleGrid
        width="full"
        columns={4}
        gap="11px"
        position="relative"
        alignItems="flex-start"
      >
        <HStack spacing={0} position="relative">
          <Field
            as={FormTextInput}
            name="lengthCm"
            type="number"
            label="Length"
            customStyle={{ pr: '53px' }}
          />
          <DimensionDropDown
            options={sampleDimensions}
            value={dimensions.length}
            handleChange={(value: string) =>
              setDimensions((prev) => ({ ...prev, depth: value }))
            }
          />
        </HStack>
        <HStack spacing={0} position="relative">
          <Field
            as={FormTextInput}
            name="widthCm"
            type="number"
            label="Width"
            customStyle={{ pr: '53px' }}
          />
          <DimensionDropDown
            options={sampleDimensions}
            value={dimensions.width}
            handleChange={(value: string) =>
              setDimensions((prev) => ({ ...prev, width: value }))
            }
          />
        </HStack>

        <HStack spacing={0} position="relative">
          <Field
            as={FormTextInput}
            name="heightCm"
            type="number"
            label="Height"
            customStyle={{ pr: '53px' }}
          />
          <DimensionDropDown
            options={sampleDimensions}
            value={dimensions.height}
            handleChange={(value: string) =>
              setDimensions((prev) => ({ ...prev, height: value }))
            }
          />
        </HStack>
        <HStack spacing={0} position="relative">
          <Field
            as={FormTextInput}
            name="weightKg"
            type="number"
            label="Weight"
            customStyle={{ pr: '53px' }}
          />
          <DimensionDropDown
            options={sampleDimensions}
            value={dimensions.weight}
            handleChange={(value: string) =>
              setDimensions((prev) => ({ ...prev, weight: value }))
            }
          />
        </HStack>
      </SimpleGrid>
    </HStack>
  );
};

export default AssetDimension;
