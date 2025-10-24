import {
  Grid,
  GridItem,
  HStack,
  Skeleton,
  Switch,
  Text,
  VStack,
} from '@chakra-ui/react';
import {
  ErrorMessage,
  FormInputWrapper,
  RadioBox,
  SlideTransition,
} from '@repo/ui/components';
import { useFormikContext } from 'formik';
import React from 'react';
import { MaintenanceDepreciationFormValues } from '~/lib/interfaces/asset/lifeCycle.interfaces';
import { useGetAllDepreciationMethodQuery } from '~/lib/redux/services/asset/depreciation.services';
import CustomDepreciation from './CustomDepreciation';

const DepreciationModelUsage = ({
  setIsCustomDetail,
  isCustomDetail,
}: {
  isCustomDetail: boolean;
  setIsCustomDetail: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { data, isLoading } = useGetAllDepreciationMethodQuery({});
  const { setFieldValue, values, touched, errors } =
    useFormikContext<MaintenanceDepreciationFormValues>();
  return (
    <VStack width="full" spacing={8} alignContent="flex-start">
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
                {isLoading &&
                  Array(3)
                    .fill('')
                    .map((_, index) => (
                      <Skeleton width="120px" height="25px" key={index} />
                    ))}
                {!isLoading &&
                  data?.data?.items?.map((item, index) => (
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
                {!isLoading && (
                  <HStack spacing="8px">
                    <RadioBox
                      isSelected={values?.depreciationModel === 999}
                      handleClick={() => {
                        setFieldValue('depreciationModel', 999);
                      }}
                    />
                    <Text color="black" size="md" lineHeight="140%">
                      Custom
                    </Text>
                  </HStack>
                )}
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
      <SlideTransition trigger={values?.depreciationModel === 999}>
        <CustomDepreciation
          isCustomDetail={isCustomDetail}
          setIsCustomDetail={setIsCustomDetail}
        />
      </SlideTransition>
    </VStack>
  );
};

export default DepreciationModelUsage;
