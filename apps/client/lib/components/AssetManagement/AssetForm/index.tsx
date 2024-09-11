'use client';

import { Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import FormStepper from './FormStepper';
import GeneralStep from './GeneralStep';
import AcquisitionStep from './AcquisitionStep';
import DocumentStep from './DocumentStep';
import { AssetFormDetails } from '~/lib/interfaces/asset.interfaces';
import SummaryStep from './SummaryStep';
import SlideTransition from '../../UI/SlideTransition';
import Header from './Header';
import { dateFormatter } from '~/lib/utils/Formatters';

const initialValue = {
  images: [],
  assetName: '',
  description: '',
  assetCode: '',
  brandName: '',
  modelRef: '',
  serialNo: '',
  codePrefix: '',
  codeSuffix: '',
  categoryId: '',
  subCategoryId: '',
  weightKg: undefined,
  widthCm: undefined,
  heightCm: undefined,
  depthCm: undefined,
  currentOwner: '',
  department: '',
  assignedTo: '',
  responsibleFor: '',
  acquisitionDate: '',
  conditionId: '',
  initialValue: undefined,
  warrantyStartDate: '',
  warrantyEndDate: '',
  warrantyTerms: '',
  paymentTerms: '',
  depreciationStartDate: '',
  depreciationMethod: '',
  depreciationRate: undefined,
  vendorId: '',
  vendorDetail: '',
  documents: [],
};

interface AssetFormProps {
  type: 'create' | 'edit';
  data?: AssetFormDetails;
}
const AssetForm = (props: AssetFormProps) => {
  const { type, data } = props;
  // eslint-disable-next-line no-unused-vars
  const [activeStep, setActiveStep] = useState(0);
  const [formDetails, setFormDetails] =
    useState<AssetFormDetails>(initialValue);

  useEffect(() => {
    if (data) {
      setFormDetails({
        ...formDetails,
        ...data,
        acquisitionDate: dateFormatter(data.acquisitionDate, 'DD/MM/YYYY'),
      });
    }
  }, [data]);

  return (
    <Flex width="full" direction="column" pb="24px">
      <Header type={type} />
      <Flex width="full" gap="8px" mt="32px" direction="column">
        <FormStepper currentStep={activeStep} />
        {activeStep === 0 && (
          <GeneralStep
            setActiveStep={setActiveStep}
            formDetails={formDetails}
            setFormDetails={setFormDetails}
          />
        )}
        <SlideTransition trigger={activeStep === 1}>
          {activeStep === 1 && (
            <AcquisitionStep
              setActiveStep={setActiveStep}
              formDetails={formDetails}
              setFormDetails={setFormDetails}
            />
          )}
        </SlideTransition>
        <SlideTransition trigger={activeStep === 2}>
          {activeStep === 2 && (
            <DocumentStep
              setActiveStep={setActiveStep}
              formDetails={formDetails}
              setFormDetails={setFormDetails}
            />
          )}
        </SlideTransition>
        <SlideTransition trigger={activeStep === 3}>
          {activeStep === 3 && (
            <SummaryStep
              assetFormDetails={formDetails}
              setActiveStep={setActiveStep}
            />
          )}
        </SlideTransition>
      </Flex>
    </Flex>
  );
};

export default AssetForm;
