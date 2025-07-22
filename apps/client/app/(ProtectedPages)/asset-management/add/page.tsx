'use client';

import { useSearchParams } from 'next/navigation';
import AssetForm from '~/lib/components/AssetManagement/AssetForm';
import PageLoadingSkeleton from '~/lib/components/UI/PageLoadingSkeleton';

import {
  AcquisitionInfo,
  Asset,
  AssetDocument,
} from '~/lib/interfaces/asset/general.interface';
import { useAppDispatch } from '~/lib/redux/hooks';
import { useGetAssetDocumentsByAssetIdQuery } from '~/lib/redux/services/asset/document.services';
import {
  useGetAcquisitionInfoByAssetIdQuery,
  useGetAssetInfoHeaderByIdQuery,
  useGetImagesByAssetIdQuery,
} from '~/lib/redux/services/asset/general.services';
import { useGetAssetCustomMaintenancePlanByAssetGuidQuery } from '~/lib/redux/services/maintenance/plan.services';
import { clearAsset, updateAssetForm } from '~/lib/redux/slices/AssetSlice';
import { dateFormatter } from '~/lib/utils/Formatters';

export default function Page() {
  const searchParams = useSearchParams();
  const assetIdString = searchParams?.get('assetId');
  const assetId = assetIdString ? Number(assetIdString) : undefined;
  const { data, isLoading } = useGetAssetInfoHeaderByIdQuery(
    { id: assetId! },
    {
      skip: !assetId,
    }
  );
  const { data: assetImagesData, isLoading: imagesLoading } =
    useGetImagesByAssetIdQuery(
      { assetId: assetId, pageSize: 25 },
      { skip: !assetId }
    );
  const { data: assetDocumentData, isLoading: documentsLoading } =
    useGetAssetDocumentsByAssetIdQuery(
      { id: assetId, pageSize: 25 },
      { skip: !assetId }
    );
  const { data: acquisitionData, isLoading: acquisitionLoading } =
    useGetAcquisitionInfoByAssetIdQuery({ id: assetId! }, { skip: !assetId });
  const { data: assetCustomMaintenancePlan, isLoading: planLoading } =
    useGetAssetCustomMaintenancePlanByAssetGuidQuery(
      { assetGuid: data?.data.guid ?? undefined },
      { skip: !data?.data.guid }
    );
  const dispatch = useAppDispatch();

  if (
    isLoading ||
    imagesLoading ||
    acquisitionLoading ||
    documentsLoading ||
    planLoading
  ) {
    return <PageLoadingSkeleton />;
  }

  if (data?.data) {
    let formImages;
    let formDocuments;
    const asset: Asset = data?.data;
    //Populating Asset Images
    if (assetImagesData?.data) {
      formImages = assetImagesData.data.items.map((image) => ({
        imageId: null,
        imageName: image.imageName || null,
        base64PhotoImage: `${image.base64Prefix}${image.photoImage}`,
        base64Prefix: null,
        isPrimaryImage: image.isPrimaryImage,
      }));
    }
    //Populating Asset Documents
    if (assetDocumentData?.data) {
      formDocuments = assetDocumentData.data.items
        .filter((item) => item.document !== null)
        .map((document: AssetDocument) => ({
          documentId: document.documentId || null,
          documentName: document.documentName || null,
          base64Document: document.document,
          base64Prefix: document.base64Prefix,
        }));
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
        assetId: null,
        parentId: asset.parentId,
        assetName: asset.assetName,
        lengthCm: asset.lengthCm,
        widthCm: asset.widthCm,
        weightKg: asset.weightKg,
        heightCm: asset.heightCm,
        description: asset.description,
        brandName: asset.brandName,
        modelRef: asset.modelRef,
        serialNo: null,
        conditionId: asset.conditionId,
        categoryId: asset.categoryId,
        subCategoryId: asset.subCategoryId,
        assetTypeId: asset.assetTypeId,
        assetTypeName: asset.assetType,
        statusId: asset.assetStatusId,
        statusName: asset.currentStatus,
        locationId: asset.locationId,
        categoryName: asset.assetCategory,
        subCategoryName: asset.assetSubCategory,
        currentOwnerName: asset.currentOwner,
        responsibleForName: asset.employeeResponsible,
        assignedToName: asset.assignedTo,
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
        images: formImages ?? [],
        documents: formDocuments ?? [],
        maintenancePlans: assetCustomMaintenancePlan?.data.items ?? [],
        ...acquisitionInfo,
      })
    );
    dispatch(clearAsset());
  }
  return <AssetForm type="create" />;
}
