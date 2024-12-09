'use client';
import { Box, Flex, HStack, Icon, Text, VStack } from '@chakra-ui/react';

import { FormikProvider, useFormik } from 'formik';
import AssetSelect from '../../Common/AssetSelect';
import { ChevronLeftIcon } from '../../CustomIcons';
import Button from '../../UI/Button';
import DateTimeButtons from '../../UI/DateTimeComponents/DateTimeButtons';
import FilterDropDown from '../../UI/FilterDropDown';
import FormInputWrapper from '../../UI/Form/FormInputWrapper';
import Header from '../Header';

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
        <Header showGenerate={false} />

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

        <FormikProvider value={formik}>
          <Box p="16px" bg="white" borderRadius="6px" mt="20px">
            <Text fontWeight={400} color="#0E2642" fontSize="14px">
              Generate a Report
            </Text>

            <HStack
              alignItems="center"
              justifyContent="space-between"
              gap="24px"
              mt={10}
            >
              <FormInputWrapper
                sectionMaxWidth="141px"
                spacing="24px"
                description="Add name that users can likely search with"
                title="Select from Table"
                isRequired
                flex={1}
              >
                <AssetSelect selectName="assetId" selectTitle="Asset" />
              </FormInputWrapper>

              <FormInputWrapper
                sectionMaxWidth="141px"
                spacing="8px"
                description="Find and select the asset you require"
                title="Column"
                isRequired
                flex={1}
              >
                <VStack
                  // borderWidth={1}
                  // borderColor="red"
                  width="full"
                  spacing="12px"
                  alignItems="flex-start"
                >
                  <FilterDropDown
                    label=""
                    options={[]}
                    handleClick={(value) => console.log(value)}
                    selectedOptions={[]}
                    showBorder
                    labelStyles={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
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
                flex={1}
              >
                <VStack width="full" spacing="12px" alignItems="flex-start">
                  <DateTimeButtons
                    buttonVariant={'secondary'}
                    includeTime={true}
                    minDate={new Date()}
                  />
                </VStack>
              </FormInputWrapper>
            </HStack>
          </Box>
        </FormikProvider>
      </Flex>
    </div>
  );
};

export default GenerateReport;
