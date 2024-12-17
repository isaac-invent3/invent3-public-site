'use client';
import { Box, Flex, Grid, Icon, Text, VStack } from '@chakra-ui/react';

import { Button } from '@repo/ui/components';
import { FormikProvider, useFormik } from 'formik';
import moment from 'moment';
import { ChevronLeftIcon } from '../../CustomIcons';
import DateTimeButtons from '../../UI/DateTimeComponents/DateTimeButtons';
import FormInputWrapper from '../../UI/Form/FormInputWrapper';
import Header from '../Header';
import DynamicConditions from './Condition';
import SystemContextColumnsSelect from './SystemContextColumnsSelect';
import SystemContextSelect from './SystemContextSelect';

const GenerateReport = () => {
  const initialValues = {
    tableTitle: null,
    columns: [],
    startDate: '',
    endDate: '',
    conditions: [],
    selectedTable: undefined,
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: false,
    onSubmit: async () => {},
  });

  const { values, setFieldValue } = formik;

  return (
    <div>
      <Flex width="full" direction="column" pb="24px" pt="12px">
        <Header showGenerate={false} header="Generate Report" />

        <FormikProvider value={formik}>
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
                  handleSelect={(option) =>
                    setFieldValue('selectedTable', option.value)
                  }
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
                    handleSelect={(value) => console.log(value)}
                    selectedOptions={[]}
                    selectedContextTypeId={values.selectedTable}
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
                      startDate: formik.values.startDate
                        ? moment(formik.values.startDate, 'DD/MM/YYYY').toDate()
                        : undefined,
                      endDate: formik.values.endDate
                        ? moment(formik.values.endDate, 'DD/MM/YYYY').toDate()
                        : undefined,
                    }}
                    handleRange={(info) => {
                      formik.setFieldValue(
                        'startDate',
                        info.startDate
                          ? moment(info.startDate).format('DD/MM/YYYY')
                          : null
                      );

                      formik.setFieldValue(
                        'endDate',
                        info.endDate
                          ? moment(info.endDate).format('DD/MM/YYYY')
                          : null
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
                Select your output with conditions above to generate your report
              </Text>
            </VStack>
          </Box>

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
