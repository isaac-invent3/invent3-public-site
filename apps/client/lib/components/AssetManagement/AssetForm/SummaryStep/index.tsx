import { Flex, useDisclosure, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Asset } from '~/lib/interfaces/asset/general.interface';
import SectionOne from './SectionOne';
import SectionTwo from './SectionTwo';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { useSession } from 'next-auth/react';
import moment from 'moment';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import {
  useCreateAssetMutation,
  useUpdateAssetMutation,
} from '~/lib/redux/services/asset/general.services';
import AddAssetSuccessModal from '../../Modals/AddAssetSuccessModal';
import AssetSuccessModal from '../../Modals/AssetSuccessModal';
import ChildAssetSuccessModal from '../../Modals/ChildAssetSuccessModal';
import {
  clearAsset,
  clearAssetForm,
  setAsset,
} from '~/lib/redux/slices/AssetSlice';
import {
  generateDocumentArray,
  generateImagesArray,
  mapIdsToObject,
} from './helperFunction';
import { FormActionButtons } from '@repo/ui/components';
import SectionThree from './SectionThree';
import { FORM_ENUM, ROUTES } from '~/lib/utils/constants';

interface SummaryStepProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  type: 'create' | 'edit';
}

const SummaryStep = (props: SummaryStepProps) => {
  const { activeStep, setActiveStep, type } = props;
  const assetData = useAppSelector((state) => state.asset.asset);
  const [assetResponse, setAssetResponse] = useState<Asset | null>(null);
  const assetFormDetails = useAppSelector((state) => state.asset.assetForm);
  const dispatch = useAppDispatch();
  const { handleSubmit } = useCustomMutation();
  const [createAsset, { isLoading: createLoading }] = useCreateAssetMutation();
  const [updateAsset, { isLoading: updateLoading }] = useUpdateAssetMutation();
  const [username, setUsername] = useState<string | undefined | null>(
    undefined
  );
  const {
    isOpen: isOpenEditModal,
    onClose: onCloseEditModal,
    onOpen: onOpenEditModal,
  } = useDisclosure();
  const {
    isOpen: isOpenAddModal,
    onClose: onCloseAddModal,
    onOpen: onOpenAddModal,
  } = useDisclosure();
  const {
    isOpen: isOpenChildModal,
    onClose: onCloseChildModal,
    onOpen: onOpenChildModal,
  } = useDisclosure();
  const { data } = useSession();

  //Store Username so that it is retained in the state.
  useEffect(() => {
    if (data) {
      setUsername(data?.user?.username);
    }
  }, [data]);

  const LOCATION = {
    lgaId: assetFormDetails.lgaId,
    facilityId: assetFormDetails.facilityId,
    buildingId: assetFormDetails.buildingId,
    floorId: assetFormDetails.floorId,
    departmentId: assetFormDetails?.departmentId,
    roomId: assetFormDetails.roomId,
    aisleId: assetFormDetails.aisleId,
    shelfId: assetFormDetails.shelfId,
    ...(type === 'edit'
      ? {
          locationId: assetFormDetails.locationId,
        }
      : {}),
    [`${type === 'create' ? 'createdBy' : 'lastModifiedBy'}`]: username,
  };

  const DEPRECIATION = {
    ...(type === 'edit'
      ? {
          assetId: assetFormDetails.assetId,
          depreciationId: assetFormDetails.depreciationId,
        }
      : {}),
    depreciationDate: moment(
      assetFormDetails.depreciationStartDate,
      'DD/MM/YYYY'
    ).toISOString(),
    depreciationMethod: assetFormDetails.depreciationMethod,
    depreciationRate: assetFormDetails.depreciationRate,
    initialValue: assetFormDetails.initialValue,
    accumulatedDepreciation: 0,
    currentValue: assetFormDetails.currentValue,
    [`${type === 'create' ? 'createdBy' : 'lastModifiedBy'}`]: username,
  };

  const ASSET = {
    ...(type === 'edit' ? { assetId: assetFormDetails.assetId } : {}),
    assetName: assetFormDetails.assetName!,
    brandName: assetFormDetails.brandName!,
    modelRef: assetFormDetails.modelRef!,
    serialNo: assetFormDetails.serialNo!,
    description: assetFormDetails.description!,
    weightKg: assetFormDetails.weightKg!,
    lengthCm: assetFormDetails.lengthCm!,
    widthCm: assetFormDetails.widthCm!,
    heightCm: assetFormDetails.heightCm!,
    purchaseDate: moment(
      assetFormDetails.purchaseDate,
      'DD/MM/YYYY'
    ).toISOString()!,
    lifeExpectancy: assetFormDetails.lifeExpectancy!,
    assetTypeId: assetFormDetails.assetTypeId!,
    statusId: assetFormDetails.statusId!,
    categoryId: assetFormDetails.categoryId!,
    currentOwner: assetFormDetails.currentOwner!,
    responsibleFor: assetFormDetails.responsibleFor!,
    assignedTo: assetFormDetails.assignedTo!,
    conditionId: assetFormDetails.conditionId!,
    acquisitionDate: moment(
      assetFormDetails.acquisitionDate,
      'DD/MM/YYYY'
    ).toISOString()!,
    initialValue: assetFormDetails.initialValue!,
    resalevalue: assetFormDetails.resaleValue!,
    scrapvalue: assetFormDetails.scrapValue!,
    parentId: assetData?.assetId! ?? assetFormDetails.parentId!,
    subCategoryId: assetFormDetails.subCategoryId!,
    [`${type === 'create' ? 'createdBy' : 'lastModifiedBy'}`]: username,
  };

  const WARRANTY = {
    warrantyDetails: assetFormDetails.warrantyDetails!,
    startDate: assetFormDetails.warrantyStartDate
      ? moment(assetFormDetails.warrantyStartDate, 'DD/MM/YYYY').format(
          'YYYY-MM-DD'
        )
      : null,
    expiryDate: assetFormDetails.warrantyEndDate
      ? moment(assetFormDetails.warrantyEndDate, 'DD/MM/YYYY').format(
          'YYYY-MM-DD'
        )
      : null,
    ...(type === 'edit'
      ? {
          assetId: assetFormDetails.assetId,
          warrantyId: assetFormDetails.warrantyId,
        }
      : {}),
    [`${type === 'create' ? 'createdBy' : 'lastModifiedBy'}`]: username,
  };

  const IMAGES = generateImagesArray(
    type,
    assetFormDetails,
    username as string
  );
  const DOCUMENTS = generateDocumentArray(
    type,
    assetFormDetails,
    username as string
  );

  const createAssetPayload = {
    createLocationDto: LOCATION,
    createAssetDto: ASSET,
    createAssetWarrantyDto: WARRANTY,
    createAssetDepreciationDto: DEPRECIATION,
    createAssetImageDto: IMAGES,
    createAssetDocumentsDto: DOCUMENTS.length > 0 ? DOCUMENTS : null,
    masterVendorCreateDto: assetFormDetails.vendorFormDetails,
    maintenancePlanIds:
      assetFormDetails.newMaintenancePlanIds.length > 0
        ? assetFormDetails.newMaintenancePlanIds
        : null,
    assetDocumentIds:
      assetFormDetails.existingDocumentsIds.length > 0
        ? assetFormDetails.existingDocumentsIds
        : null,

    existingVendorId: assetFormDetails?.vendorId!,
  };

  const updateAssetPayload = {
    updateLocationDto: LOCATION,
    updateAssetDto: ASSET,
    updateAssetWarrantyDto: WARRANTY,
    updateAssetDepreciationDto: DEPRECIATION,
    multiPurposeAssetImageDto: [
      ...IMAGES,
      ...assetFormDetails.deletedImageIds.map((item) => ({
        imageId: item,
        actionType: FORM_ENUM.delete,
        changeInitiatedBy: username,
      })),
    ],
    multiPurposeAssetDocumentDto: DOCUMENTS.length > 0 ? DOCUMENTS : null,
    assetPlans: mapIdsToObject(
      assetFormDetails.newMaintenancePlanIds,
      assetFormDetails.deletedMaintenancePlanIds
    )!,
    assetDocuments: mapIdsToObject(
      assetFormDetails.existingDocumentsIds,
      assetFormDetails.deletedExistingDocumentIds
    )!,
  };

  const handleModalAction = (type: 'childAsset' | 'parentAsset') => {
    if (type === 'childAsset') {
      if (!assetData?.assetId && assetResponse) {
        dispatch(setAsset(assetResponse));
      }
    }
    if (type === 'parentAsset') {
      dispatch(clearAsset());
    }
    setActiveStep(1);
    dispatch(clearAssetForm());
    onCloseAddModal();
    onCloseChildModal();
    onCloseEditModal();
  };

  const handleSumbitAsset = async () => {
    if (type === 'create') {
      const response = await handleSubmit(createAsset, createAssetPayload, '');
      if (response?.data) {
        setAssetResponse(response?.data?.data);
        if (assetData?.assetId) {
          onOpenChildModal();
        } else {
          onOpenAddModal();
        }
      }
    } else {
      const response = await handleSubmit(updateAsset, updateAssetPayload, '');
      if (response?.data) {
        onOpenEditModal();
      }
    }
  };

  return (
    <>
      <Flex
        width="full"
        gap="16px"
        direction="column"
        display={activeStep === 5 ? 'flex' : 'none'}
      >
        <VStack
          width="full"
          alignItems="flex-start"
          spacing={{ base: '32px', lg: '40px' }}
          bgColor="white"
          pt={{ base: '16px' }}
          pl={{ md: '24px', lg: '16px' }}
          pb={{ base: '16px', lg: '40px' }}
          pr={{ md: '24px', lg: '44px' }}
          rounded="8px"
          minH="60vh"
        >
          <SectionOne />
          <SectionTwo />
          <SectionThree />
        </VStack>
        <FormActionButtons
          cancelLink={`/${ROUTES.ASSETS}`}
          totalStep={5}
          activeStep={5}
          setActiveStep={setActiveStep}
          handleContinue={handleSumbitAsset}
          isLoading={createLoading || updateLoading}
          loadingText={createLoading ? 'Submitting...' : 'Updating...'}
        />
      </Flex>
      {isOpenAddModal && (
        <AddAssetSuccessModal
          isOpen={isOpenAddModal}
          onClose={onCloseAddModal}
          handleAction={handleModalAction}
        />
      )}
      {isOpenChildModal && (
        <ChildAssetSuccessModal
          isOpen={isOpenChildModal}
          onClose={onCloseChildModal}
          handleAction={handleModalAction}
        />
      )}
      {isOpenEditModal && (
        <AssetSuccessModal
          isOpen={isOpenEditModal}
          onClose={onCloseEditModal}
          successText="Asset edited successfully"
          buttonWidth="full"
        />
      )}
    </>
  );
};

export default SummaryStep;
