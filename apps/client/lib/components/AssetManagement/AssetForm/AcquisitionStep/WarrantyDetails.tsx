import { Flex, Grid, GridItem, Stack } from '@chakra-ui/react';

import {
  DateTimeButtons,
  FormInputWrapper,
  FormSectionInfo,
  FormTextInput,
} from '@repo/ui/components';
import { Field, useFormikContext } from 'formik';
import moment from 'moment';
import { AssetFormDetails } from '~/lib/interfaces/asset/general.interface';

const WarrantyDetails = () => {
  const { setFieldValue, values } = useFormikContext<AssetFormDetails>();
  return (
    <Stack
      width="full"
      direction={{ base: 'column', lg: 'row' }}
      alignItems="flex-start"
      spacing={{ base: '16px', lg: '33px' }}
    >
      <Flex width="full" maxW="144px" display={{ base: 'none', lg: 'flex' }}>
        <FormSectionInfo
          title="Warranty Details"
          info="Provide the warranty period and coverage."
          isRequired={false}
        />
      </Flex>
      <Grid templateColumns={{ lg: 'repeat(3, 1fr)' }} gap="20px" width="full">
        <GridItem colSpan={1}>
          <FormInputWrapper
            sectionMaxWidth="130px"
            customSpacing="0px"
            description="Provide the warranty period and coverage."
            title="Warranty Details"
            isRequired={false}
            direction={{ base: 'column', md: 'row' }}
            formSectionCustomStyle={{
              maxW: { md: '130px' },
              display: { lg: 'none' },
            }}
          >
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
                  info.endDate
                    ? moment(info.endDate).format('DD/MM/YYYY')
                    : null
                );
              }}
            />
          </FormInputWrapper>
        </GridItem>

        <GridItem colSpan={1}>
          <FormInputWrapper
            sectionMaxWidth="130px"
            customSpacing="0px"
            description="List conditions covered by the warranty."
            title="Warranty Terms"
            isRequired={false}
            direction={{ base: 'column', md: 'row' }}
            formSectionCustomStyle={{
              maxW: { md: '130px' },
            }}
          >
            <Field
              as={FormTextInput}
              name="warrantyDetails"
              type="text"
              label="Warranty Terms"
            />
          </FormInputWrapper>
        </GridItem>

        <GridItem colSpan={1}>
          <FormInputWrapper
            sectionMaxWidth="130px"
            customSpacing="0px"
            description="Specify the expected lifespan of the asset"
            title="Life Expectancy"
            isRequired={false}
            direction={{ base: 'column', md: 'row' }}
            formSectionCustomStyle={{
              maxW: { md: '130px' },
            }}
          >
            <Field
              as={FormTextInput}
              name="lifeExpectancy"
              type="number"
              label="Life Expectancy"
            />
          </FormInputWrapper>
        </GridItem>
      </Grid>
    </Stack>
  );
};

export default WarrantyDetails;
