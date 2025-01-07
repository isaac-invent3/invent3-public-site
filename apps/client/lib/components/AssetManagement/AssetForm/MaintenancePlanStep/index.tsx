import { Flex, HStack, useDisclosure, VStack } from '@chakra-ui/react';
import { FormikProvider, useFormik } from 'formik';
import { useAppSelector } from '~/lib/redux/hooks';
import {
  FormActionButtons,
  FormAddButton,
  FormSectionInfo,
} from '@repo/ui/components';
import { assetMaintenancePlanSchema } from '~/lib/schemas/asset/main.schema';
import ExistingMaintenancePlanModal from './ExistingMaintenancePlanModal';
import PlanList from './PlanList';

interface MaintenancePlanStepProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}
const MaintenancePlanStep = (props: MaintenancePlanStepProps) => {
  const { activeStep, setActiveStep } = props;
  const formDetails = useAppSelector((state) => state.asset.assetForm);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialValues = {
    maintenancePlans:
      formDetails.maintenancePlans.map((plan) => plan.maintenancePlanId) ?? [],
  };

  const formik = useFormik({
    initialValues,
    validationSchema: assetMaintenancePlanSchema,
    enableReinitialize: true,
    onSubmit: async () => {
      setActiveStep(4);
    },
  });

  return (
    <Flex
      width="full"
      height="full"
      direction="column"
      display={activeStep === 3 ? 'flex' : 'none'}
    >
      <FormikProvider value={formik}>
        <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
          <VStack
            width="full"
            alignItems="flex-start"
            position="relative"
            bgColor="white"
            pt="26px"
            pl="16px"
            pb="24px"
            pr="41px"
            rounded="6px"
            spacing="51px"
            minH="60vh"
          >
            <HStack width="full" alignItems="flex-start" spacing="64px">
              <Flex width="full" maxW="118px">
                <FormSectionInfo
                  title="Maintenance Plan"
                  info="Specify the Plan for asset upkeep"
                  isRequired={false}
                />
              </Flex>
              <VStack width="full" spacing="27px" overflow="auto">
                <VStack width="full" spacing="8px" overflow="auto">
                  <PlanList />
                </VStack>
                <FormAddButton
                  handleClick={onOpen}
                  color="blue.500"
                  customTextStyle={{ fontWeight: 700 }}
                >
                  Add a New Maintenance Plan
                </FormAddButton>
              </VStack>
            </HStack>
          </VStack>
          <Flex width="full" mt="16px">
            <FormActionButtons
              cancelLink="/asset-management"
              totalStep={5}
              activeStep={3}
              setActiveStep={setActiveStep}
            />
          </Flex>
        </form>
        <ExistingMaintenancePlanModal isOpen={isOpen} onClose={onClose} />
      </FormikProvider>
    </Flex>
  );
};

export default MaintenancePlanStep;
