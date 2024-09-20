import { Flex, useDisclosure, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Asset } from '~/lib/interfaces/asset.interfaces';
import SectionOne from './SectionOne';
import SectionTwo from './SectionTwo';
import FormActionButtons from '../FormActionButtons';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { useSession } from 'next-auth/react';
import moment from 'moment';
import { IMAGES_ENUM } from '~/lib/utils/constants';
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
} from '~/lib/redux/slices/assetSlice';

interface SummaryStepProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  type: 'create' | 'edit';
}

interface Image {
  imageId?: number;
  imageName: string;
  base64PhotoImage?: string;
  isPrimaryImage?: boolean;
  assetId?: number;
  actionType?: (typeof IMAGES_ENUM)[keyof typeof IMAGES_ENUM];
  createdBy?: string;
  lastModifiedBy?: string | null;
}

const SummaryStep = (props: SummaryStepProps) => {
  const { activeStep, setActiveStep, type } = props;
  const assetData = useAppSelector((state) => state.asset.asset);
  const assetImages = useAppSelector((state) => state.asset.assetImages);
  const [assetResponse, setAssetResponse] = useState<Asset | null>(null);
  const assetFormDetails = useAppSelector((state) => state.asset.assetForm);
  const dispatch = useAppDispatch();
  const { handleSubmit } = useCustomMutation();
  const [createAsset, { isLoading: createLoading }] = useCreateAssetMutation();
  const [updateAsset, { isLoading: updateLoading }] = useUpdateAssetMutation();
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
  const username = data?.user?.username;

  const LOCATION = {
    facilityId: assetFormDetails.facilityId,
    buildingId: assetFormDetails.buildingId,
    floorId: assetFormDetails.floorId,
    departmentId: assetFormDetails?.departmentId,
    roomId: assetFormDetails.roomId,
    aisleId: assetFormDetails.aisleId,
    shelfId: assetFormDetails.shelfId,
    [`${type === 'create' ? 'createdBy' : 'lastModifiedBy'}`]: username,
  };

  const DEPRECIATION = {
    ...(type === 'edit' ? { assetId: assetFormDetails.assetId } : {}),
    depreciationDate: moment(
      assetFormDetails.depreciationStartDate,
      'DD/MM/YYYY'
    ).toISOString(),
    depreciationMethod: assetFormDetails.depreciationMethod,
    depreciationRate: assetFormDetails.depreciationRate,
    initialValue: assetFormDetails.initialValue,
    accumulatedDepreciation: 0,
    currentValue: 0,
    [`${type === 'create' ? 'createdBy' : 'lastModifiedBy'}`]: username,
  };

  const ASSET = {
    assetName: assetFormDetails.assetName,
    brandName: assetFormDetails.brandName,
    modelRef: assetFormDetails.modelRef,
    assetTag: 'string',
    rfidtag: 'string',
    serialNo: assetFormDetails.serialNo,
    description: assetFormDetails.description,
    weightKg: assetFormDetails.weightKg,
    lengthCm: assetFormDetails.lengthCm,
    widthCm: assetFormDetails.widthCm,
    heightCm: assetFormDetails.heightCm,
    purchaseDate: '2024-09-19T13:54:09.635Z',
    lifeExpectancy: 0,
    locationId: 0,
    assetTypeId: 0,
    statusId: 0,
    categoryId: assetFormDetails.categoryId,
    currentOwner: assetFormDetails.currentOwnerName,
    responsibleFor: assetFormDetails.responsibleForName,
    assignedTo: assetFormDetails.assignedToName,
    conditionId: assetFormDetails.conditionId,
    acquisitionDate: moment(
      assetFormDetails.acquisitionDate,
      'DD/MM/YYYY'
    ).toISOString(),
    initialValue: assetFormDetails.initialValue,
    resalevalue: 0,
    scrapvalue: 0,
    parentId: assetData.assetId ?? null,
    subCategoryId: assetFormDetails.subCategoryId,
    [`${type === 'create' ? 'createdBy' : 'lastModifiedBy'}`]: username,
  };

  const WARRANTY = {
    warrantyDetails: assetFormDetails.warrantyTerms,
    startDate: moment(assetFormDetails.warrantyStartDate, 'DD/MM/YYYY').format(
      'YYYY-MM-DD'
    ),
    expiryDate: moment(assetFormDetails.warrantyEndDate, 'DD/MM/YYYY').format(
      'YYYY-MM-DD'
    ),
    ...(type === 'edit' ? { assetId: assetFormDetails.assetId } : {}),
    [`${type === 'create' ? 'createdBy' : 'lastModifiedBy'}`]: username,
  };

  const generateImagesArray = () => {
    const images: Image[] = [];

    // Handle new images or updates
    assetFormDetails.images.forEach((image) => {
      const imageData: Image = {
        imageName: image.imageName as string,
        base64PhotoImage: image.base64PhotoImage,
        isPrimaryImage: image.isPrimaryImage,
        [type === 'create' ? 'createdBy' : 'lastModifiedBy']: username,
      };

      if (image.imageId) {
        imageData.imageId = image.imageId;
      }

      if (type === 'edit') {
        imageData.assetId = assetFormDetails.assetId as number;
        imageData.actionType = image.imageId
          ? IMAGES_ENUM.update
          : IMAGES_ENUM.add;
      }

      images.push(imageData);
    });

    // Handle deletions in edit mode
    if (type === 'edit') {
      assetImages.forEach((assetImage) => {
        const imageExists = images.some(
          (image) => image.imageId === assetImage.imageId
        );
        if (!imageExists) {
          images.push({
            imageId: assetImage.imageId,
            imageName: assetImage.imageName,
            assetId: assetImage.assetId,
            actionType: IMAGES_ENUM.delete,
            lastModifiedBy: username,
          });
        }
      });
    }

    return images;
  };

  const getDtoKey = (base: string) =>
    `${type === 'create' ? `create${base}Dto` : `update${base}Dto`}`;
  const PAYLOAD = {
    [getDtoKey('Location')]: LOCATION,
    [getDtoKey('Asset')]: ASSET,
    [getDtoKey('AssetImage')]: generateImagesArray(),
    [getDtoKey('AssetWarranty')]: WARRANTY,
    [getDtoKey('AssetDepreciation')]: DEPRECIATION,
  };

  const handleSumbitAsset = async () => {
    if (type === 'create') {
      const response = await handleSubmit(createAsset, PAYLOAD, '');
      if (response?.data) {
        setAssetResponse(response?.data?.data);
        if (assetData) {
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

  const handleModalAction = (type: 'childAsset' | 'parentAsset') => {
    if (type === 'childAsset') {
      if (!assetData.assetId && assetResponse) {
        dispatch(setAsset(assetResponse));
      }
    }
    if (type === 'parentAsset') {
      dispatch(clearAsset());
    }
    dispatch(clearAssetForm());
  };

  return (
    <>
      <Flex
        width="full"
        gap="16px"
        direction="column"
        display={activeStep === 3 ? 'flex' : 'none'}
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
        >
          <SectionOne />
          <SectionTwo />
        </VStack>
        <FormActionButtons
          activeStep={3}
          setActiveStep={setActiveStep}
          handleContinue={handleSumbitAsset}
          isLoading={createLoading || updateLoading}
          loadingText={createLoading ? 'Submitting...' : 'Updating...'}
        />
      </Flex>
      <AddAssetSuccessModal
        isOpen={isOpenAddModal}
        onClose={onCloseAddModal}
        handleAction={handleModalAction}
      />
      <ChildAssetSuccessModal
        isOpen={isOpenChildModal}
        onClose={onCloseChildModal}
        handleAction={handleModalAction}
      />
      <AssetSuccessModal
        isOpen={isOpenEditModal}
        onClose={onCloseEditModal}
        successText="Asset edited successfully"
        buttonWidth="full"
      />
    </>
  );
};

export default SummaryStep;
