'use client';
import { Box, Flex, Grid, Icon, Text, VStack } from '@chakra-ui/react';
import { Button, ErrorMessage } from '@repo/ui/components';
import { FormikProvider, useFormik } from 'formik';
import { ChevronLeftIcon } from '../../CustomIcons';
import Header from '../Header';
import DynamicConditions from './DynamicConditions';
import SystemContextColumnsSelect from './SystemContextColumnsSelect';
import SystemContextSelect from './SystemContextSelect';

import { ListResponse } from '@repo/interfaces';
import { FormInputWrapper } from '@repo/ui/components';
import { useState } from 'react';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import {
  GenerateReportDetails,
  GenerateReportResponse,
} from '~/lib/interfaces/report.interfaces';
import { useGenerateReportMutation } from '~/lib/redux/services/reports.services';
import { generateReportSchema } from '~/lib/schemas/report.schema';
import GeneratedReport from './GeneratedReport';

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
    systemContextTypeId: undefined,
    contextTypeColumns: [],
    contextTypeName: undefined,
    startDate: '',
    endDate: '',
  };

  const [generateReport, { isLoading: isGeneratingReport }] =
    useGenerateReportMutation({});

  const { handleSubmit } = useCustomMutation();

  const [generatedReport, setGeneratedReport] =
    useState<ListResponse<GenerateReportResponse> | null>(null);

  const formik = useFormik({
    initialValues,
    enableReinitialize: false,
    validationSchema: generateReportSchema,
    onSubmit: async (data) => {
      const payload = {
        ...data,
      };

      const response = await handleSubmit(
        generateReport,
        payload,
        'Report Generated Successfully'
      );

      response?.data && setGeneratedReport(response?.data.data);
    },
  });

  const { values, setFieldValue } = formik;

  return (
    <div>
      <Flex width="full" direction="column" pb="24px" pt="12px">
        <Header showGenerate={false} header="Generate Report" />

        <FormikProvider value={formik}>
          <Box p="16px" bg="white" borderRadius="6px" mt="20px" height="100%">
            <form onSubmit={formik.handleSubmit}>
              <Grid
                templateColumns={{
                  base: '1fr',
                  md: 'repeat(4, 1fr)',
                  // xl: '1.2fr 1fr 1.2fr',
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
                  gridColumn="span 2"
                >
                  <VStack width="full" spacing="4px" alignItems="flex-start">
                    <SystemContextSelect
                      selectName="systemContextTypeId"
                      selectTitle="Select from Table"
                      isInvalid={
                        formik.submitCount > 0 &&
                        formik.errors.systemContextTypeId
                          ? true
                          : false
                      }
                      handleSelect={(option) => {
                        setFieldValue('contextTypeId', option.value);
                      }}
                    />
                    {formik.submitCount > 0 &&
                      formik.errors.systemContextTypeId && (
                        <ErrorMessage>
                          {formik.errors.systemContextTypeId}
                        </ErrorMessage>
                      )}
                  </VStack>
                </FormInputWrapper>

                <FormInputWrapper
                  sectionMaxWidth="141px"
                  spacing="8px"
                  description="Find and select the asset you require"
                  title="Column"
                  isRequired
                  gridColumn="span 2"
                >
                  <VStack width="full" spacing="12px" alignItems="flex-start">
                    <SystemContextColumnsSelect
                      selectedOptions={values.contextTypeColumns}
                      selectedContextTypeId={values.systemContextTypeId}
                    />
                  </VStack>
                </FormInputWrapper>

                <VStack gridColumn="span 3">
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
                  isLoading={isGeneratingReport}
                  isDisabled={
                    Object.keys(formik.errors).length > 0 ? true : false
                  }
                  customStyles={{
                    width: '169px',
                    alignSelf: 'end',
                  }}
                >
                  Generate
                </Button>
              </Grid>
            </form>

            {!generatedReport && (
              <VStack justifyContent="center" height="33vh">
                <Text fontWeight={700} size="md" color="#0E2642">
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
            )}

            {generatedReport && (
              <GeneratedReport
                response={generatedReport}
                generatePayload={formik.values}
              />
            )}
          </Box>

          <Button
            customStyles={{
              px: '16px',
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
