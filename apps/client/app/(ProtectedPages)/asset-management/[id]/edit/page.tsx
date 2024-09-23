'use client';

import { Skeleton } from '@chakra-ui/react';
import { notFound } from 'next/navigation';

import AssetForm from '~/lib/components/AssetManagement/AssetForm';
import { Asset, AssetImages } from '~/lib/interfaces/asset.interfaces';
import { useAppDispatch } from '~/lib/redux/hooks';
import {
  useGetAssetByIdQuery,
  useGetImagesByAssetIdQuery,
} from '~/lib/redux/services/asset/general.services';
import { setAssetImages, updateAssetForm } from '~/lib/redux/slices/assetSlice';
import { dateFormatter } from '~/lib/utils/Formatters';

export default function Page({ params }: { params: { id: string } }) {
  const { data, isLoading } = useGetAssetByIdQuery(params.id);
  const { data: assetImagesData, isLoading: imagesLoading } =
    useGetImagesByAssetIdQuery({ id: params.id });
  const dispatch = useAppDispatch();

  if (isLoading || imagesLoading) {
    return <Skeleton width="full" rounded="8px" height="250px" mt="80px" />;
  }
  if (!data?.data) return notFound();
  if (data?.data) {
    let formImages;
    const asset: Asset = data?.data;
    if (assetImagesData?.data) {
      dispatch(setAssetImages(assetImagesData?.data?.items));
      formImages = assetImagesData.data.items.map((image: AssetImages) => ({
        imageId: image.imageId || null,
        imageName: image.imageName || null,
        base64PhotoImage: image.photoImage,
        isPrimaryImage: image.isPrimaryImage,
      }));
    }
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
        conditionName: asset.currentCondition,
        conditionId: asset.conditionId,
        categoryId: asset.categoryId,
        subCategoryId: asset.subCategoryId,
        assetTypeId: asset.assetTypeId,
        statusId: asset.statusId,
        locationId: asset.locationId,
        categoryName: asset.assetCategory,
        subCategoryName: asset.assetSubCategory,
        currentOwnerName: asset.currentOwner,
        responsibleForName: asset.responsibleFor,
        acquisitionDate: asset.acquisitionDate
          ? dateFormatter(asset.acquisitionDate, 'DD/MM/YYYY')
          : null,
        images: formImages,
      })
    );
  }

  return <AssetForm type="edit" />;
}
