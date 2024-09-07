import { Flex, Grid, GridItem, HStack, Icon } from '@chakra-ui/react';
import React from 'react';
import SectionInfo from '../SectionInfo';
import { Field } from 'formik';
import TextInput from '~/lib/components/UI/TextInput';
import { SearchIcon } from '~/lib/components/CustomIcons/layout';
import TextareaInput from '~/lib/components/UI/TextArea';

const VendorDetails = () => {
  return (
    <HStack width="full" alignItems="flex-start" spacing="78px">
      <Flex width="full" maxW="144px">
        <SectionInfo
          title="Vendor Details"
          info="Add name that users can likely search with"
          isRequired
        />
      </Flex>
      <Grid templateColumns="repeat(3, 1fr)" gap="20px" width="full">
        <GridItem colSpan={1}>
          <Field
            as={TextInput}
            name="vendorId"
            type="text"
            label="Search for Vendor"
            leftElementWidth="36px"
            customLeftElement={
              <Icon as={SearchIcon} boxSize="20px" color="neutral.800" />
            }
          />
        </GridItem>
        <GridItem colSpan={2}>
          <Field
            as={TextareaInput}
            name="vendorDetail"
            type="text"
            label="Details"
            customStyle={{ height: '146px' }}
          />
        </GridItem>
      </Grid>
    </HStack>
  );
};

export default VendorDetails;
