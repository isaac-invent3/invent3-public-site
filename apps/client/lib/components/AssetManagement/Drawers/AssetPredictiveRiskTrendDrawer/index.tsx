import { useAppFormik } from '~/lib/hooks/useAppFormik';
import {
  DrawerBody,
  DrawerHeader,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import {
  BackButton,
  Button,
  FormInputWrapper,
  FormSelect,
  GenericDrawer,
} from '@repo/ui/components';
import { FormikProvider } from 'formik';
import { getSession } from 'next-auth/react';
import CategorySelect from '~/lib/components/AssetManagement/AssetForm/GeneralStep/AssetCategory/CategorySelect';
import GraphPreview from './GraphPreview';
import { predictiveRiskComparisionSchema } from '~/lib/schemas/asset/prediction.schema';
import { Option } from '@repo/interfaces';
import { useMemo } from 'react';
import { DATE_PERIOD } from '~/lib/utils/constants';
import _ from 'lodash';
import AssetSelect from './AssetSelect';

interface AssetPredictiveRiskTrendDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const AssetPredictiveRiskTrendDrawer = (
  props: AssetPredictiveRiskTrendDrawerProps
) => {
  const { isOpen, onClose } = props;

  const initialValues = {
    assets: [],
    type: null,
    range: null,
  };

  const formik = useAppFormik({
    initialValues,
    enableReinitialize: false,
    validationSchema: predictiveRiskComparisionSchema,
    onSubmit: async (data, { setSubmitting }) => {
      console.log({ data });
      setSubmitting(true);
      const session = await getSession();

      setSubmitting(false);
    },
  });

  const options = useMemo<Option[]>(
    () =>
      Object.entries(DATE_PERIOD).map(([label, value]) => ({
        label: `${value} days`,
        value,
      })),
    []
  );
  return (
    <>
      <GenericDrawer isOpen={isOpen} onClose={onClose} maxWidth="666px">
        <DrawerHeader p={0} m={0}>
          <HStack
            pt="16px"
            pb="40px"
            px="24px"
            width="full"
            justifyContent="space-between"
          >
            <BackButton handleClick={onClose} />
          </HStack>
        </DrawerHeader>
        <FormikProvider value={formik}>
          <DrawerBody p={0}>
            <Flex direction="column" width="full" alignItems="flex-start">
              <VStack alignItems="flex-start" spacing="8px" px="24px">
                <Heading
                  size={{ base: 'lg', lg: 'xl' }}
                  color="primary.500"
                  fontWeight={800}
                >
                  Predictive Risk Trend Over Time
                </Heading>
                <Text color="black" fontWeight={400} size="md">
                  Compare the health and risk progression of selected assets.
                </Text>
              </VStack>

              <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
                <VStack width="full" spacing={{ base: '72px' }}>
                  <VStack
                    width="full"
                    spacing={{ base: '16px' }}
                    px="24px"
                    mt="43px"
                    mb="24px"
                  >
                    <FormInputWrapper
                      sectionMaxWidth="190px"
                      customSpacing="35px"
                      description="Select up to 5 assets to compare predictive behavior over time."
                      title="Select Assets"
                      isRequired
                    >
                      <AssetSelect />
                    </FormInputWrapper>
                    <FormInputWrapper
                      sectionMaxWidth="190px"
                      customSpacing="35px"
                      description="Provide details about the task objective"
                      title="Compared by"
                      isRequired
                    >
                      <FormSelect
                        name="type"
                        title="Type"
                        options={[{ value: 1, label: 'Risk Score' }]}
                        selectStyles={{ height: '46px', pt: '0px' }}
                      />
                    </FormInputWrapper>
                    <FormInputWrapper
                      sectionMaxWidth="190px"
                      customSpacing="35px"
                      description="Select the Date Range"
                      title="Date Range"
                      isRequired
                    >
                      <HStack width="full" spacing={4} alignItems="flex-start">
                        <FormSelect
                          name="range"
                          title="Period"
                          options={options}
                          selectStyles={{ height: '46px', pt: '0px' }}
                        />
                        <Button
                          customStyles={{ width: 'full', maxW: '131px' }}
                          handleClick={formik.handleSubmit}
                        >
                          Refresh Graph
                        </Button>
                      </HStack>
                    </FormInputWrapper>
                  </VStack>
                  <GraphPreview />
                </VStack>
              </form>
            </Flex>
          </DrawerBody>
        </FormikProvider>
      </GenericDrawer>
    </>
  );
};

export default AssetPredictiveRiskTrendDrawer;
