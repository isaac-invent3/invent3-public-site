import { useAppFormik } from '~/lib/hooks/useAppFormik';
import { Flex, useMediaQuery, VStack } from '@chakra-ui/react';
import { FormikProvider } from 'formik';

import { documentSchema } from '~/lib/schemas/asset/main.schema';
import AddDocument from './AddDocument';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { updateAssetForm } from '~/lib/redux/slices/AssetSlice';
import { FormActionButtons, FormInputWrapper } from '@repo/ui/components';
import { ROUTES } from '~/lib/utils/constants';

interface DocumentStepProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}
const DocumentStep = (props: DocumentStepProps) => {
  const { activeStep, setActiveStep } = props;
  const formDetails = useAppSelector((state) => state.asset.assetForm);
  const dispatch = useAppDispatch();
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  const initialValues = {
    documents: formDetails?.documents ?? [],
  };

  const formik = useAppFormik({
    initialValues,
    validationSchema: documentSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      dispatch(updateAssetForm(values));
      setActiveStep(5);
    },
  });

  return (
    <Flex
      width="full"
      direction="column"
      display={activeStep === 4 ? 'flex' : 'none'}
    >
      <FormikProvider value={formik}>
        <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
          <VStack
            width="full"
            alignItems="flex-start"
            position="relative"
            bgColor="white"
            pt={{ base: '16px', lg: '26px' }}
            pl={{ md: '24px', lg: '16px' }}
            pb={{ base: '16px', lg: '24px' }}
            pr={{ md: '24px', lg: '41px' }}
            rounded="6px"
            spacing="51px"
            minH="60vh"
          >
            <FormInputWrapper
              sectionMaxWidth="125px"
              customSpacing="64px"
              description="Attach related files for this asset"
              title="Upload Documents"
              isRequired={false}
            >
              <AddDocument
                variant={isMobile ? 'secondary' : 'primary'}
                handleNewExistingDocumentsIds={(ids) =>
                  dispatch(
                    updateAssetForm({
                      existingDocumentsIds: [
                        ...formDetails.existingDocumentsIds,
                        ...ids,
                      ],
                    })
                  )
                }
              />
            </FormInputWrapper>
          </VStack>
          <Flex width="full" mt="16px">
            <FormActionButtons
              cancelLink={`/${ROUTES.ASSETS}`}
              totalStep={5}
              activeStep={4}
              setActiveStep={setActiveStep}
            />
          </Flex>
        </form>
      </FormikProvider>
    </Flex>
  );
};

export default DocumentStep;
