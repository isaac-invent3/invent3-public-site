'use client';
import { Box, Flex, Grid, Icon, Text, VStack } from '@chakra-ui/react';

import { FormikProvider, useFormik } from 'formik';
import AssetSelect from '../../Common/AssetSelect';
import { ChevronLeftIcon } from '../../CustomIcons';
import Button from '../../UI/Button';
import DateTimeButtons from '../../UI/DateTimeComponents/DateTimeButtons';
import FilterDropDown from '../../UI/FilterDropDown';
import FormInputWrapper from '../../UI/Form/FormInputWrapper';
import Header from '../Header';
import DynamicConditions from './Condition';

const GenerateReport = () => {
  const initialValues = {
    tableTitle: null,
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: false,
    onSubmit: async () => {},
  });

  return (
    <div>
      <Flex width="full" direction="column" pb="24px" pt="12px">
        <Header showGenerate={false} header="Generate Report" />

        <FormikProvider value={formik}>
          <Box p="16px" bg="white"  borderRadius="6px" mt="20px" height="100%">
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
                <AssetSelect selectName="assetId" selectTitle="Asset" />
              </FormInputWrapper>

              <FormInputWrapper
                sectionMaxWidth="141px"
                spacing="8px"
                description="Find and select the asset you require"
                title="Column"
                isRequired
              >
                <VStack width="full" spacing="12px" alignItems="flex-start">
                  <FilterDropDown
                    label=""
                    options={[]}
                    handleClick={(value) => console.log(value)}
                    selectedOptions={[]}
                    containerStyles={{
                      maxW: 'none',
                    }}
                    labelStyles={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                    chevronStyles={{
                      boxSize: '16px',
                    }}
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
                    buttonVariant={'secondary'}
                    includeTime={true}
                    minDate={new Date()}
                  />
                </VStack>
              </FormInputWrapper>

              <VStack gridColumn="span 2">
                <DynamicConditions />
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
              <Text color="#838383" width="200px" margin="0 auto" textAlign="center">
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
