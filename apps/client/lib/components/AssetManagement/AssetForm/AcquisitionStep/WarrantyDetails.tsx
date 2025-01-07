import { Flex, Grid, GridItem, HStack } from '@chakra-ui/react';

import {
  DateTimeButtons,
  FormSectionInfo,
  FormTextInput,
} from '@repo/ui/components';
import { Field, useFormikContext } from 'formik';
import moment from 'moment';
import { AssetFormDetails } from '~/lib/interfaces/asset/general.interface';

const WarrantyDetails = () => {
  const { setFieldValue, values } = useFormikContext<AssetFormDetails>();
  return (
    <HStack width="full" alignItems="flex-start" spacing="78px">
      <Flex width="full" maxW="144px">
        <FormSectionInfo
          title="Warranty Details"
          info="Provide the warranty period and coverage."
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

        <GridItem colSpan={1}>
          <HStack width="full" alignItems="flex-start" spacing="0px">
            <Flex width="full" maxW="130px">
              <FormSectionInfo
                title="Warranty Terms"
                info="List conditions covered by the warranty."
                isRequired
              />
            </Flex>
            <Field
              as={FormTextInput}
              name="warrantyDetails"
              type="text"
              label="Warranty Terms"
            />
          </HStack>
        </GridItem>

        <GridItem colSpan={1}>
          <HStack width="full" alignItems="flex-start" spacing="0px">
            <Flex width="full" maxW="130px">
              <FormSectionInfo
                title="Life Expectancy"
                info="Specify the expected lifespan of the asset"
                isRequired
              />
            </Flex>
            <Field
              as={FormTextInput}
              name="lifeExpectancy"
              type="number"
              label="Life Expectancy"
            />
          </HStack>
        </GridItem>
      </Grid>
    </HStack>
  );
};

export default WarrantyDetails;
