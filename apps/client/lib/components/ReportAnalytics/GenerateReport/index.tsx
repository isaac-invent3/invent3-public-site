'use client';
import { Box, Flex, Grid, Icon, Text, VStack } from '@chakra-ui/react';
import { Button } from '@repo/ui/components';
import { FormikProvider, useFormik } from 'formik';
import moment from 'moment';
import { ChevronLeftIcon } from '../../CustomIcons';
import Header from '../Header';
import DynamicConditions from './Condition';
import SystemContextColumnsSelect from './SystemContextColumnsSelect';
import SystemContextSelect from './SystemContextSelect';

import { DateTimeButtons, FormInputWrapper } from '@repo/ui/components';
import { useEffect } from 'react';
import { GenerateReportDetails } from '~/lib/interfaces/report.interfaces';
import { generateReportSchema } from '~/lib/schemas/report.schema';

const GenerateReport = () => {
  const initialValues: GenerateReportDetails = {
    criterion: [
      {
        columnName: null,
        columnValue: null,
        operation: null,
        join: 1,
      },
    ],
    contextTypeId: undefined,
    contextTypeColumns: [],
    contextTypeName: undefined,
    startDate: '',
    endDate: '',
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: false,
    validationSchema: generateReportSchema,
    onSubmit: async () => {},
  });

  const { values, setFieldValue } = formik;

  const formatDate = (date: Date | undefined) => {
    if (!date) return null;
    return moment(date).format('DD/MM/YYYY');
  };

  const parseDate = (dateString: string | null) => {
    return dateString ? moment(dateString, 'DD/MM/YYYY').toDate() : undefined;
  };

  useEffect(() => {
    console.log({ errors: formik.errors });
  }, [formik.errors]);

  return (
    <div>
      <Flex width="full" direction="column" pb="24px" pt="12px">
        <Header showGenerate={false} header="Generate Report" />

        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <Box p="16px" bg="white" borderRadius="6px" mt="20px" height="100%">
              <Text fontWeight={400} color="#0E2642" fontSize="14px">
                Generate a Report
              </Text>

              <Grid
                templateColumns={{
                  base: '1fr',
                  md: 'repeat(2, 1fr)',
                  xl: '1.2fr 1fr 1.2fr',
                }}
                gap="32px"
                mt={10}
                height="100%"
                paddingBottom="2rem"
                borderBottom="1px solid #BBBBBB"
              >
                <FormInputWrapper
                  sectionMaxWidth="141px"
                  spacing="24px"
                  description="Add name that users can likely search with"
                  title="Select from Table"
                  isRequired
                >
                  <SystemContextSelect
                    selectName="systemContextTypeId"
                    selectTitle="Select from Table"
                    handleSelect={(option) => {
                      setFieldValue('contextTypeId', option.value);
                    }}
                  />
                </FormInputWrapper>

                <FormInputWrapper
                  sectionMaxWidth="141px"
                  spacing="8px"
                  description="Find and select the asset you require"
                  title="Column"
                  isRequired
                >
                  <VStack width="full" spacing="12px" alignItems="flex-start">
                    <SystemContextColumnsSelect
                      selectedOptions={values.contextTypeColumns}
                      selectedContextTypeId={values.contextTypeId}
                      handleSelect={(value) =>
                        setFieldValue('contextTypeColumns', [
                          ...values.contextTypeColumns,
                          value,
                        ])
                      }
                    />
                  </VStack>
                </FormInputWrapper>

                <FormInputWrapper
                  sectionMaxWidth="141px"
                  spacing="24px"
                  description="Add name that users can likely search with"
                  title="Date Range"
                  isRequired
                >
                  <VStack width="full" spacing="12px" alignItems="flex-start">
                    <DateTimeButtons
                      buttonVariant="secondary"
                      includeTime={false}
                      isRange
                      customDateHeader="Date"
                      customButtonLabel="Select Start & End Date"
                      showPredefinedDates={false}
                      range={{
                        startDate: parseDate(formik.values.startDate),
                        endDate: parseDate(formik.values.endDate),
                      }}
                      handleRange={(info) => {
                        formik.setFieldValue(
                          'startDate',
                          formatDate(info.startDate)
                        );

                        formik.setFieldValue(
                          'endDate',
                          formatDate(info.endDate)
                        );
                      }}
                    />
                  </VStack>
                </FormInputWrapper>

                <VStack gridColumn="span 2">
                  <FormInputWrapper
                    sectionMaxWidth="118px"
                    spacing="24px"
                    description="Add name that users can likely search with"
                    title="Condition"
                    isRequired
                  >
                    <DynamicConditions />
                  </FormInputWrapper>
                </VStack>

                <Button
                  variant="primary"
                  type="submit"
                  customStyles={{
                    width: '169px',
                    alignSelf: 'end',
                  }}
                >
                  Generate
                </Button>
              </Grid>

              <VStack justifyContent="center" height="33vh">
                <Text fontWeight={700} fontSize="14x" color="#0E2642">
                  No Report Generated Yet
                </Text>
                <Text
                  color="#838383"
                  width="200px"
                  margin="0 auto"
                  textAlign="center"
                >
                  Select your output with conditions above to generate your
                  report
                </Text>
              </VStack>
            </Box>
          </form>

          <Button
            customStyles={{
              px: '16px',
              spacing: '8px',
              bgColor: '#F6F6F6',
              width: '85px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              marginTop: '24px',
              _disabled: {
                bgColor: '#F6F6F666',
                cursor: 'not-allowed',
              },
              _hover: {
                bgColor: '#F6F6F666',
              },
              _focus: {
                bgColor: '#F6F6F6',
              },
            }}
          >
            <Icon
              as={ChevronLeftIcon}
              boxSize="16px"
              mb="7px"
              mr="8px"
              color="black"
            />
            <Text color="primary.500">Back</Text>
          </Button>
        </FormikProvider>
      </Flex>
    </div>
  );
};

export default GenerateReport;
