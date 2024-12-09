import { Flex, Grid, GridItem, HStack } from '@chakra-ui/react';
import React from 'react';
import SectionInfo from '../../../UI/Form/FormSectionInfo';
import { Field, useFormikContext } from 'formik';
import TextInput from '~/lib/components/UI/TextInput';
import DateTimeButtons from '~/lib/components/UI/DateTimeComponents/DateTimeButtons';
import { AssetFormDetails } from '~/lib/interfaces/asset.interfaces';
import moment from 'moment';

const WarrantyDetails = () => {
  const { setFieldValue, values } = useFormikContext<AssetFormDetails>();
  return (
    <HStack width="full" alignItems="flex-start" spacing="78px">
      <Flex width="full" maxW="144px">
        <SectionInfo
          title="Warranty Details"
          info="Choose the category and the sub-category"
          isRequired={false}
        />
      </Flex>
      <Grid templateColumns="repeat(3, 1fr)" gap="16px" width="full">
        <GridItem colSpan={1}>
          <DateTimeButtons
            buttonVariant="secondary"
            includeTime={false}
            isRange
            customDateHeader="Date"
            customButtonLabel="Select Start & End Date"
            showPredefinedDates={false}
            range={{
              startDate: values.warrantyStartDate
                ? moment(values.warrantyStartDate, 'DD/MM/YYYY').toDate()
                : undefined,
              endDate: values.warrantyEndDate
                ? moment(values.warrantyEndDate, 'DD/MM/YYYY').toDate()
                : undefined,
            }}
            handleRange={(info) => {
              setFieldValue(
                'warrantyStartDate',
                info.startDate
                  ? moment(info.startDate).format('DD/MM/YYYY')
                  : null
              );
              setFieldValue(
                'warrantyEndDate',
                info.endDate ? moment(info.endDate).format('DD/MM/YYYY') : null
              );
            }}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <HStack width="full" alignItems="flex-start" spacing="0px">
            <Flex width="full" maxW="130px">
              <SectionInfo
                title="Life Expectancy"
                info="Add name that users can likely search with"
                isRequired
              />
            </Flex>
            <Field
              as={TextInput}
              name="lifeExpectancy"
              type="number"
              label="Life Expectancy"
            />
          </HStack>
        </GridItem>
        <GridItem colSpan={1}>
          <Field
            as={TextInput}
            name="warrantyDetails"
            type="text"
            label="Warranty Terms"
          />
        </GridItem>
      </Grid>
    </HStack>
  );
};

export default WarrantyDetails;
