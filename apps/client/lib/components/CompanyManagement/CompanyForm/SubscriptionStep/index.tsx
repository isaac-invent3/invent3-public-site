import { Flex, Stack, VStack } from '@chakra-ui/react';
import {
  DateTimeButtons,
  FormActionButtons,
  FormInputWrapper,
  FormSelect,
} from '@repo/ui/components';
import { FormikProvider, useFormik } from 'formik';
import moment from 'moment';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { updateCompanyForm } from '~/lib/redux/slices/CompanySlice';
import { companySubscriptionSchema } from '~/lib/schemas/company/main.schema';
import { ROUTES } from '~/lib/utils/constants';

interface SubscriptionStepProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}
const SubscriptionStep = (props: SubscriptionStepProps) => {
  const { activeStep, setActiveStep } = props;
  const { companyForm: formDetails } = useAppSelector((state) => state.company);
  const dispatch = useAppDispatch();
  const previousDay = moment().subtract(1, 'days').format('DD/MM/YYYY');

  const [inputtedStartDate, setInputtedStartDate] = useState<Date | undefined>(
    undefined
  );
  const formik = useFormik({
    initialValues: {
      subscriptionPlan: formDetails.subscriptionPlan ?? null,
      startDate: formDetails.startDate ?? null,
      endDate: formDetails.endDate ?? null,
    },
    validationSchema: companySubscriptionSchema(
      previousDay,
      moment(inputtedStartDate).format('DD/MM/YYYY') ?? undefined
    ),
    enableReinitialize: true,
    onSubmit: async (values) => {
      dispatch(updateCompanyForm(values));
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
            spacing={{ base: '24px', lg: '43px' }}
            width="full"
            alignItems="flex-start"
            bgColor="white"
            pt={{ base: '16px', lg: '26px' }}
            pl={{ md: '24px', lg: '16px' }}
            pb={{ base: '16px', lg: '33px' }}
            pr={{ md: '24px', lg: '44px' }}
            rounded="6px"
            minH={{ lg: '60vh' }}
          >
            <FormInputWrapper
              sectionMaxWidth="141px"
              customSpacing="47px"
              title="Subscription Plan"
              description="Provide the person’s Job Title"
              w={{ base: 'full', md: '50%' }}
            >
              <FormSelect
                name="subscriptionPlan"
                title="Subscription Plan"
                options={[{ label: 'Test', value: 'test' }]}
                isSearchable
              />
            </FormInputWrapper>

            <Stack
              flexDir={{ base: 'column', md: 'row' }}
              gap={{ base: '24px', lg: '43px' }}
              justifyContent="space-between"
              w="full"
            >
              <FormInputWrapper
                sectionMaxWidth="141px"
                customSpacing="47px"
                title="Start Date"
                description="Provide the person’s Job Title"
              >
                <DateTimeButtons
                  buttonVariant="secondary"
                  includeTime={false}
                  minDate={new Date()}
                  selectedDate={formik.values.startDate ?? undefined}
                  handleDateTimeSelect={(dateTime) => {
                    // setInputtedStartDate(dateTime);
                    formik.setFieldValue('startDate', dateTime?.trim() ?? null);
                  }}
                />
              </FormInputWrapper>

              <FormInputWrapper
                sectionMaxWidth="141px"
                customSpacing="47px"
                title="End Date"
                description="Provide the person’s Job Title"
              >
                <DateTimeButtons
                  buttonVariant="secondary"
                  includeTime={false}
                  minDate={inputtedStartDate ?? new Date()}
                  selectedDate={formik.values.endDate ?? undefined}
                  handleDateTimeSelect={(dateTime) => {
                    formik.setFieldValue('endDate', dateTime?.trim() ?? null);
                  }}
                />
              </FormInputWrapper>
            </Stack>
          </VStack>

          <Flex width="full" mt="16px">
            <FormActionButtons
              cancelLink={`/${ROUTES.COMPANY}`}
              totalStep={4}
              activeStep={3}
              setActiveStep={setActiveStep}
            />
          </Flex>
        </form>
      </FormikProvider>
    </Flex>
  );
};

export default SubscriptionStep;
