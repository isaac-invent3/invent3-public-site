import { useAppFormik } from '~/lib/hooks/useAppFormik';
import {
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  Flex,
  Heading,
  HStack,
  Switch,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import {
  BackButton,
  Button,
  ErrorMessage,
  FormAddButton,
  FormInputWrapper,
  FormTextAreaInput,
  GenericDrawer,
  GenericSuccessModal,
} from '@repo/ui/components';
import { Field, FormikProvider } from 'formik';
import { getSession } from 'next-auth/react';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import StageSelect from './StageSelect';
import ConditionBuilder from './ConditionBuilder';
import { transitionRuleSchema } from '~/lib/schemas/settings.schema';
import { formatConditionsPreview } from '~/lib/utils/conditionHelper';
import { AssetLifeCycleTransitionRuleList } from '~/lib/interfaces/asset/lifeCycle.interfaces';
import {
  useCreateAssetLifeCycleTransitionRulesMutation,
  useUpdateAssetLifeCycleTransitionRulesMutation,
} from '~/lib/redux/services/asset/lifeCycle.services';

interface StageTransitionRuleDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data?: AssetLifeCycleTransitionRuleList;
}

const StageTransitionRuleDrawer = (props: StageTransitionRuleDrawerProps) => {
  const { isOpen, onClose, data } = props;
  const { handleSubmit } = useCustomMutation();
  const [createAssetLifeCycleTransitionRule] =
    useCreateAssetLifeCycleTransitionRulesMutation();
  const [updateAssetLifeCycleTransitionRule] =
    useUpdateAssetLifeCycleTransitionRulesMutation();
  const {
    isOpen: isOpenSuccess,
    onOpen: onOpenSuccess,
    onClose: onCloseSuccess,
  } = useDisclosure();
  const {
    isOpen: isOpenConditionBuilder,
    onOpen: onOpenConditionBuilder,
    onClose: onCloseConditionBuilder,
  } = useDisclosure();

  const initialValues = {
    stageId: data?.ruleId ?? null!,
    conditions: (data?.conditions as any) ?? [],
    description: data?.description ?? null!,
    status: data?.isActive ?? false,
  };

  const formik = useAppFormik({
    initialValues,
    enableReinitialize: false,
    validationSchema: transitionRuleSchema,
    onSubmit: async (values, { setSubmitting }) => {
      console.log({ data });
      setSubmitting(true);
      const session = await getSession();
      let response;
      if (!data) {
        response = await handleSubmit(
          createAssetLifeCycleTransitionRule,
          {
            requiresApproval: false,
            condition: values.conditions,
            toTransitionStage: values.stageId,
            description: values.description,
            isActive: true,
            createdBy: session?.user?.username!,
          },
          ''
        );
      } else {
        response = await handleSubmit(
          updateAssetLifeCycleTransitionRule,
          {
            ruleId: data?.ruleId!,
            requiresApproval: false,
            condition: values.conditions,
            toTransitionStage: values.stageId,
            description: values.description,
            isActive: true,
            lastModifiedBy: session?.user?.username!,
          },
          ''
        );
      }

      if (response?.data) {
        onOpenSuccess();
      }

      setSubmitting(false);
    },
  });

  return (
    <>
      <GenericDrawer isOpen={isOpen} onClose={onClose} maxWidth="525px">
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
                  Add New Stage Transition Rule
                </Heading>
              </VStack>

              <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
                <VStack
                  width="full"
                  spacing={{ base: '38px', lg: '40px' }}
                  px="24px"
                  mt="43px"
                  mb="24px"
                >
                  <FormInputWrapper
                    sectionMaxWidth="141px"
                    customSpacing="24px"
                    description="Select the stage you want to define transitions for."
                    title="Destination Stage"
                    isRequired
                  >
                    <StageSelect />
                  </FormInputWrapper>
                  <VStack width="full" spacing={4} alignItems="flex-start">
                    <Heading size="md" color="primary.500">
                      Allowed Transitions
                    </Heading>
                    <FormInputWrapper
                      sectionMaxWidth="141px"
                      customSpacing="24px"
                      description="Stage Transition Condition"
                      title="Conditions"
                      isRequired
                    >
                      <VStack width="full" spacing={1} alignItems="flex-start">
                        <VStack
                          width="full"
                          spacing={4}
                          alignItems="flex-start"
                        >
                          {formik.values.conditions.length > 0 && (
                            <HStack width="full" justifyContent="space-between">
                              <Text size="md" maxW="209px">
                                {formatConditionsPreview(
                                  formik.values.conditions
                                )}
                              </Text>
                              <Text
                                cursor="pointer"
                                color="blue.500"
                                onClick={onOpenConditionBuilder}
                              >
                                Edit
                              </Text>
                            </HStack>
                          )}
                          {formik.values?.conditions.length === 0 && (
                            <FormAddButton handleClick={onOpenConditionBuilder}>
                              Add Condition
                            </FormAddButton>
                          )}
                        </VStack>
                        {formik.errors?.conditions && (
                          <>
                            {Array.isArray(formik.errors.conditions) ? (
                              formik.errors.conditions.map((err, i) => {
                                if (typeof err === 'string') {
                                  return (
                                    <ErrorMessage key={i}>{err}</ErrorMessage>
                                  );
                                }

                                if (typeof err === 'object' && err !== null) {
                                  return Object.entries(err).map(
                                    ([key, message]) => (
                                      <ErrorMessage key={key}>
                                        {message as string}
                                      </ErrorMessage>
                                    )
                                  );
                                }

                                return null;
                              })
                            ) : typeof formik.errors.conditions === 'string' ? (
                              <ErrorMessage>
                                {formik.errors.conditions}
                              </ErrorMessage>
                            ) : null}
                          </>
                        )}
                      </VStack>
                    </FormInputWrapper>
                    <FormInputWrapper
                      sectionMaxWidth="141px"
                      customSpacing="24px"
                      description="Provide details about the task objective"
                      title="Description"
                      isRequired
                    >
                      <Field
                        as={FormTextAreaInput}
                        name="description"
                        type="text"
                        label="Description"
                        placeholder="Description"
                        customStyle={{ height: '95px' }}
                      />
                    </FormInputWrapper>
                    <FormInputWrapper
                      sectionMaxWidth="141px"
                      customSpacing="24px"
                      description="Status of the transition rule"
                      title="Status"
                      isRequired
                    >
                      <HStack spacing={5}>
                        <Text size="md" lineHeight="140%">
                          Active
                        </Text>
                        <Switch
                          size="sm"
                          isChecked={formik.values.status}
                          onChange={() =>
                            formik.setFieldValue(
                              'status',
                              !formik.values.status
                            )
                          }
                        />
                      </HStack>
                    </FormInputWrapper>
                  </VStack>
                  <VStack
                    width="full"
                    spacing={1}
                    alignItems="flex-start"
                    p={4}
                    bgColor="neutral.200"
                    rounded="8px"
                  >
                    <Text fontWeight={700} size="md">
                      Preview
                    </Text>
                    <Text color="neutral.600" size="md" maxW="80%" minH="100px">
                      {formatConditionsPreview(formik.values.conditions)}
                    </Text>
                  </VStack>
                </VStack>
              </form>
            </Flex>
          </DrawerBody>

          <DrawerFooter p={0} m={0}>
            <HStack
              width="full"
              spacing="16px"
              justifyContent={{ base: 'center', lg: 'flex-end' }}
              mt="8px"
              px="24px"
              pb="32px"
            >
              <Button
                customStyles={{ width: '138px', height: '50px' }}
                variant="secondary"
                handleClick={onClose}
              >
                Cancel
              </Button>

              <Button
                isLoading={formik.isSubmitting}
                handleClick={() => {
                  formik.handleSubmit();
                }}
                customStyles={{
                  width: { base: '157px' },
                  height: '50px',
                }}
              >
                Save Rule
              </Button>
            </HStack>
          </DrawerFooter>
        </FormikProvider>
      </GenericDrawer>

      <GenericSuccessModal
        isOpen={isOpenSuccess}
        onClose={() => {
          onCloseSuccess();
          onClose();
        }}
        successText={`${data ? 'You have updated the' : 'You have added a new Stage'} transition rule successfully`}
        mainModalStyle={{ closeOnOverlayClick: false, closeOnEsc: false }}
      >
        <Button
          customStyles={{ width: '193px' }}
          handleClick={() => {
            onCloseSuccess();
            onClose();
          }}
        >
          Continue
        </Button>
      </GenericSuccessModal>
      <ConditionBuilder
        isOpen={isOpenConditionBuilder}
        onClose={onCloseConditionBuilder}
        setParentFieldValue={(value) =>
          formik.setFieldValue('conditions', value)
        }
        initialCondition={formik.values.conditions}
      />
    </>
  );
};

export default StageTransitionRuleDrawer;
