'use client';

import { Skeleton } from '@chakra-ui/react';
import { notFound } from 'next/navigation';

import AssetForm from '~/lib/components/AssetManagement/AssetForm';
import {
  AcquisitionInfo,
  Asset,
  AssetDocument,
  AssetImage,
} from '~/lib/interfaces/asset.interfaces';
import { useAppDispatch } from '~/lib/redux/hooks';
import {
  useGetAcquisitionInfoByAssetIdQuery,
  useGetAssetInfoHeaderByIdQuery,
  useGetDocumentsByAssetIdQuery,
  useGetImagesByAssetIdQuery,
} from '~/lib/redux/services/asset/general.services';
import {
  setAssetDocuments,
  setAssetImages,
  updateAssetForm,
} from '~/lib/redux/slices/assetSlice';
import { dateFormatter } from '~/lib/utils/Formatters';

export default function Page({ params }: { params: { id: string } }) {
  const { data, isLoading } = useGetAssetInfoHeaderByIdQuery(params.id);
  const { data: assetImagesData, isLoading: imagesLoading } =
    useGetImagesByAssetIdQuery({ id: params.id, pageSize: 25 });
  const { data: assetDocumentData, isLoading: documentsLoading } =
    useGetDocumentsByAssetIdQuery({ id: params.id, pageSize: 25 });
  const { data: acquisitionData, isLoading: acquisitionLoading } =
    useGetAcquisitionInfoByAssetIdQuery({ id: params.id });
  const dispatch = useAppDispatch();

  if (isLoading || imagesLoading || acquisitionLoading || documentsLoading) {
    return <Skeleton width="full" rounded="8px" height="250px" mt="80px" />;
  }
  if (!data?.data) return notFound();
  if (data?.data) {
    let formImages;
    let formDocuments;
    const asset: Asset = data?.data;
    //Populating Asset Images
    if (assetImagesData?.data) {
      dispatch(setAssetImages(assetImagesData?.data?.items));
      formImages = assetImagesData.data.items.map((image: AssetImage) => ({
        imageId: image.imageId || null,
        imageName: image.imageName || null,
        base64PhotoImage: image.photoImage,
        base64prefix: image.base64Prefix,
        isPrimaryImage: image.isPrimaryImage,
      }));
    }
    //Populating Asset Documents
    if (assetDocumentData?.data) {
      dispatch(setAssetDocuments(assetDocumentData?.data?.items));
      formDocuments = assetDocumentData.data.items.map(
        (document: AssetDocument) => ({
          documentId: document.documentId || null,
          documentName: document.documentName || null,
          base64Document: document.document,
          base64Prefix: document.base64Prefix,
        })
      );
    }
    let acquisitionInfo;
    //Populating Asset Acquisition Info
    if (acquisitionData?.data) {
      const acquisition: AcquisitionInfo = acquisitionData?.data;
      acquisitionInfo = {
        warrantyId: acquisition.warrantyId,
        depreciationId: acquisition.depreciationId,
        acquisitionDate: acquisition.acquisitionDate
          ? dateFormatter(acquisition.acquisitionDate, 'DD/MM/YYYY')
          : null,
        depreciationRate: acquisition.depreciationRate,
        depreciationMethod: acquisition.depreciationMethod,
        depreciationStartDate: acquisition.depreciationDate
          ? dateFormatter(acquisition.depreciationDate, 'DD/MM/YYYY')
          : null,
        purchaseDate: acquisition.purchaseDate
          ? dateFormatter(acquisition.purchaseDate, 'DD/MM/YYYY')
          : null,
        conditionName: acquisition.conditionName,
        warrantyDetails: acquisition.warrantyDetails,
        warrantyStartDate: acquisition.warrantyStartDate
          ? dateFormatter(acquisition.warrantyStartDate, 'DD/MM/YYYY')
          : null,
        warrantyEndDate: acquisition.warrantyStartDate
          ? dateFormatter(acquisition.warrantyStartDate, 'DD/MM/YYYY')
          : null,
        currentValue: acquisition.currentDepreciationValue,
        resaleValue: acquisition.resalevalue,
        scrapValue: acquisition.scrapvalue,
        vendorId: acquisition.vendorId,
        accumulatedDepreciation: acquisition.accumulatedDepreciation,
        vendorDetails: {
          vendorName: acquisition.vendorName,
          address: acquisition.vendorAddress,
          phoneNumber: acquisition.vendorContactNo,
          emailAddress: acquisition.vendorContactEmail,
        },
      };
    }
    //Populating Other Asset Informations
    dispatch(
      updateAssetForm({
        assetId: asset.assetId,
        assetName: asset.assetName,
        lengthCm: asset.lengthCm,
        widthCm: asset.widthCm,
        weightKg: asset.weightKg,
        heightCm: asset.heightCm,
        description: asset.description,
        brandName: asset.brandName,
        modelRef: asset.modelRef,
        serialNo: asset.serialNo,
        conditionId: asset.conditionId,
        categoryId: asset.categoryId,
        subCategoryId: asset.subCategoryId,
        assetTypeId: asset.assetTypeId,
        assetTypeName: asset.assetType,
        statusId: asset.statusId,
        statusName: asset.currentStatus,
        locationId: asset.locationId,
        categoryName: asset.assetCategory,
        subCategoryName: asset.assetSubCategory,
        currentOwnerName: asset.currentOwner,
        responsibleForName: asset.responsibleFor,
        currentOwner: asset.currentOwnerId,
        responsibleFor: asset.employeeResponsibleId,
        assignedTo: asset.assignedToEmployeeId,
        facilityId: asset.facilityId,
        facilityName: asset.facilityName,
        buildingId: asset.buildingId,
        buildingName: asset.buildingName,
        floorId: asset.floorId,
        floorName: asset.floorName,
        departmentId: asset.departmentId,
        departmentName: asset.departmentName,
        roomId: asset.roomId,
        roomName: asset.roomName,
        shelfId: asset.shelfId,
        shelfName: asset.shelfName,
        aisleId: asset.aisleId,
        aisleName: asset.aisleName,
        lgaId: asset.lgaid,
        lgaName: asset.lganame,
        stateId: asset.stateId,
        stateName: asset.stateName,
        countryId: asset.countryId,
        countryName: asset.countryName,
        lifeExpectancy: asset.lifeExpectancy,
        initialValue: asset.initialValue,
        images: formImages,
        documents: formDocuments,
        ...acquisitionInfo,
      })
    );
  }

  return <AssetForm type="edit" />;
}
