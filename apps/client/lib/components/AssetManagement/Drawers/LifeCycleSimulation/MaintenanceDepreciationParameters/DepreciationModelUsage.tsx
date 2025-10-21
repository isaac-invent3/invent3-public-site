import { Grid, GridItem, HStack, Switch, Text, VStack } from '@chakra-ui/react';
import { ErrorMessage, FormInputWrapper, RadioBox } from '@repo/ui/components';
import { useFormikContext } from 'formik';
import React from 'react';
import { AssetLifeCycleSimulation } from '~/lib/interfaces/asset/lifeCycle.interfaces';
import { useGetAllDepreciationMethodQuery } from '~/lib/redux/services/asset/depreciation.services';

const DepreciationModelUsage = () => {
  const { data } = useGetAllDepreciationMethodQuery({});
  const { setFieldValue, values, touched, errors } =
    useFormikContext<AssetLifeCycleSimulation>();
  return (
    <Grid
      templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
      gap={{ base: '24px' }}
      width="full"
    >
      <GridItem colSpan={1} width="full">
        <FormInputWrapper
          sectionMaxWidth="141px"
          customSpacing="16px"
          title="Depreciation Model"
          isRequired
          description="Select depreciation method"
        >
          <VStack alignItems="start" spacing={2}>
            <VStack alignItems="start" spacing={3}>
              {data?.data?.items?.map((item, index) => (
                <HStack key={index} spacing="8px">
                  <RadioBox
                    isSelected={
                      item.depreciationMethodId === values.depreciationModel
                    }
                    handleClick={() => {
                      setFieldValue(
                        'depreciationModel',
                        item.depreciationMethodId
                      );
                    }}
                  />
                  <Text color="black" size="md" lineHeight="140%">
                    {item.methodName}
                  </Text>
                </HStack>
              ))}
            </VStack>
            {touched?.depreciationModel && errors?.depreciationModel && (
              <ErrorMessage>{errors?.depreciationModel}</ErrorMessage>
            )}
          </VStack>
        </FormInputWrapper>
      </GridItem>
      <GridItem colSpan={1} width="full">
        <FormInputWrapper
          sectionMaxWidth="189px"
          customSpacing="16px"
          title="Auto-Adjust with Usage?"
          isRequired
          description="Auto-Adjust with Usage"
          justifyContent="space-between"
        >
          <VStack alignItems="start" spacing={2}>
            <HStack spacing={4}>
              <Text color="black" size="md" lineHeight="140%">
                No
              </Text>
              <Switch
                size="md"
                onChange={() => {
                  setFieldValue('autoAdjust', !values.autoAdjust);
                }}
              />
              <Text color="black" size="md" lineHeight="140%">
                Yes
              </Text>
            </HStack>
            {touched?.autoAdjust && errors?.autoAdjust && (
              <ErrorMessage>{errors?.autoAdjust}</ErrorMessage>
            )}
          </VStack>
        </FormInputWrapper>
      </GridItem>
    </Grid>
  );
};

export default DepreciationModelUsage;
