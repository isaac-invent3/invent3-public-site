'use client';

import { Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import Header from './Header';
import FormStepper from './FormStepper';
import GeneralStep from './GeneralStep';
import AcquisitionStep from './AcquisitionStep';
import DocumentStep from './DocumentStep';
import { AssetFormDetails } from '~/lib/interfaces/asset.interfaces';
import SummaryStep from './SummaryStep';
import SlideTransition from '../../UI/SlideTransition';

const initialValue = {
  images: [],
  name: '',
  description: '',
  assetCode: '',
  make: '',
  model: '',
  serialNo: '',
  codePrefix: '',
  codeSuffix: '',
  category: '',
  subCategory: '',
  weight: 0,
  width: 0,
  height: 0,
  depth: 0,
  owner: '',
  department: '',
  assignedTo: '',
  responsibleFor: '',
  acquisitionDate: '',
  assetCondition: '',
  purchasePrice: 0,
  warrantyStartDate: '',
  warrantyEndDate: '',
  warrantyTerms: '',
  paymentTerms: '',
  depreciationStartDate: '',
  depreciationMethod: '',
  depreciationRate: 0,
  vendorId: '',
  vendorDetail: '',
  documents: [],
};

const AssetForm = () => {
  // eslint-disable-next-line no-unused-vars
  const [activeStep, setActiveStep] = useState(0);
  const [formDetails, setFormDetails] =
    useState<AssetFormDetails>(initialValue);

  return (
    <Flex width="full" direction="column" pb="24px">
      <Header />
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
