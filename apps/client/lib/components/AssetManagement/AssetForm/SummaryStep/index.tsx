import { Flex, useDisclosure, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Asset } from '~/lib/interfaces/asset.interfaces';
import SectionOne from './SectionOne';
import SectionTwo from './SectionTwo';
import FormActionButtons from '../../../UI/Form/FormActionButtons';
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
import { generateDocumentArray, generateImagesArray } from './helperFunction';

interface SummaryStepProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  type: 'create' | 'edit';
}

const SummaryStep = (props: SummaryStepProps) => {
  const { activeStep, setActiveStep, type } = props;
  const assetData = useAppSelector((state) => state.asset.asset);
  const assetImages = useAppSelector((state) => state.asset.assetImages);
  const assetDocuments = useAppSelector((state) => state.asset.assetDocuments);
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
    assetName: assetFormDetails.assetName,
    brandName: assetFormDetails.brandName,
    modelRef: assetFormDetails.modelRef,
    serialNo: assetFormDetails.serialNo,
    description: assetFormDetails.description,
    weightKg: assetFormDetails.weightKg,
    lengthCm: assetFormDetails.lengthCm,
    widthCm: assetFormDetails.widthCm,
    heightCm: assetFormDetails.heightCm,
    // purchaseDate: moment(
    //   assetFormDetails.purchaseDate,
    //   'DD/MM/YYYY'
    // ).toISOString(),
    lifeExpectancy: assetFormDetails.lifeExpectancy,
    assetTypeId: assetFormDetails.assetTypeId,
    statusId: assetFormDetails.statusId,
    categoryId: assetFormDetails.categoryId,
    currentOwner: assetFormDetails.currentOwner,
    responsibleFor: assetFormDetails.responsibleFor,
    assignedTo: assetFormDetails.assignedTo,
    conditionId: assetFormDetails.conditionId,
    acquisitionDate: moment(
      assetFormDetails.acquisitionDate,
      'DD/MM/YYYY'
    ).toISOString(),
    initialValue: assetFormDetails.initialValue,
    resalevalue: assetFormDetails.resaleValue,
    scrapvalue: assetFormDetails.scrapValue,
    parentId: assetData.assetId ?? assetFormDetails.parentId,
    subCategoryId: assetFormDetails.subCategoryId,
    [`${type === 'create' ? 'createdBy' : 'lastModifiedBy'}`]: username,
  };

  const WARRANTY = {
    warrantyDetails: assetFormDetails.warrantyDetails,
    startDate: moment(assetFormDetails.warrantyStartDate, 'DD/MM/YYYY').format(
      'YYYY-MM-DD'
    ),
    expiryDate: moment(assetFormDetails.warrantyEndDate, 'DD/MM/YYYY').format(
      'YYYY-MM-DD'
    ),
    ...(type === 'edit'
      ? {
          assetId: assetFormDetails.assetId,
          warrantyId: assetFormDetails.warrantyId,
        }
      : {}),
    [`${type === 'create' ? 'createdBy' : 'lastModifiedBy'}`]: username,
  };

  const getDtoKey = (base: string) =>
    `${type === 'create' ? `create${base}Dto` : `update${base}Dto`}`;

  const PAYLOAD = {
    [getDtoKey('Location')]: LOCATION,
    [getDtoKey('Asset')]: ASSET,
    [type === 'create' ? 'createAssetImageDto' : 'multiPurposeAssetImageDto']:
      generateImagesArray(
        type,
        assetFormDetails,
        assetImages,
        username as string
      ),
    [type === 'create'
      ? 'createAssetDocumentsDto'
      : 'multiPurposeAssetDocumentDto']: generateDocumentArray(
      type,
      assetFormDetails,
      assetDocuments,
      username as string
    ),
    [getDtoKey('AssetWarranty')]: WARRANTY,
    [getDtoKey('AssetDepreciation')]: DEPRECIATION,
  };

  const handleModalAction = (type: 'childAsset' | 'parentAsset') => {
    if (type === 'childAsset') {
      if (!assetData.assetId && assetResponse) {
        dispatch(setAsset(assetResponse));
      }
    }
    if (type === 'parentAsset') {
      dispatch(clearAsset());
    }
    setActiveStep(0);
    dispatch(clearAssetForm());
    onCloseAddModal();
    onCloseChildModal();
    onCloseEditModal();
  };

  const handleSumbitAsset = async () => {
    if (type === 'create') {
      const response = await handleSubmit(createAsset, PAYLOAD, '');
      if (response?.data) {
        setAssetResponse(response?.data?.data);
        if (assetData.assetId) {
          onOpenChildModal();
        } else {
          onOpenAddModal();
        }
      }
    } else {
      const response = await handleSubmit(updateAsset, PAYLOAD, '');
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
        display={activeStep === 4 ? 'flex' : 'none'}
      >
        <VStack
          width="full"
          alignItems="flex-start"
          spacing="39px"
          bgColor="white"
          pt="16px"
          pl="16px"
          pr="44px"
          pb="40px"
          rounded="8px"
          minH="60vh"
        >
          <SectionOne />
          <SectionTwo />
        </VStack>
        <FormActionButtons
          cancelLink="/asset-management"
          totalStep={4}
          activeStep={4}
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
