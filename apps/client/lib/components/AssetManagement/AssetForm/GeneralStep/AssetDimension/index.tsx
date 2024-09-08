import { Flex, HStack, SimpleGrid } from '@chakra-ui/react';
import SectionInfo from '../../SectionInfo';
import { Field } from 'formik';
import TextInput from '~/lib/components/UI/TextInput';
import { useState } from 'react';
import DimensionDropDown from './DimensionDropDown';

const sampleDimensions = [
  { value: 'kg', label: 'Kg' },
  { value: 'cm', label: 'Cm' },
  { value: 'ft', label: 'Ft' },
];
const AssetDimension = () => {
  const [dimensions, setDimensions] = useState({
    weight: '',
    width: '',
    height: '',
    depth: '',
  });
  return (
    <HStack
      width="full"
      alignItems="flex-start"
      spacing="104px"
      position="relative"
    >
      <Flex width="full" maxW="118px">
        <SectionInfo
          title="Dimension"
          info="Choose the category and the sub-category"
          isRequired
        />
      </Flex>
      <SimpleGrid width="full" columns={4} gap="11px" position="relative">
        <HStack spacing={0} position="relative">
          <Field
            as={TextInput}
            name="weight"
            type="number"
            label="Weight"
            customStyle={{ pr: '70px' }}
          />
          <DimensionDropDown
            options={sampleDimensions}
            value={dimensions.weight}
            handleChange={(value: string) =>
              setDimensions((prev) => ({ ...prev, weight: value }))
            }
          />
        </HStack>

        <HStack spacing={0} position="relative">
          <Field
            as={TextInput}
            name="width"
            type="number"
            label="Width"
            customStyle={{ pr: '70px' }}
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
            as={TextInput}
            name="height"
            type="number"
            label="Height"
            customStyle={{ pr: '70px' }}
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
            as={TextInput}
            name="depth"
            type="number"
            label="Depth"
            customStyle={{ pr: '70px' }}
          />
          <DimensionDropDown
            options={sampleDimensions}
            value={dimensions.depth}
            handleChange={(value: string) =>
              setDimensions((prev) => ({ ...prev, depth: value }))
            }
          />
        </HStack>
      </SimpleGrid>
    </HStack>
  );
};

export default AssetDimension;
