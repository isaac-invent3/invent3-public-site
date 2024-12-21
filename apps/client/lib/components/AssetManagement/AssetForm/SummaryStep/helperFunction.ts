import {
  AssetDocumentsDto,
  AssetFormDetails,
  AssetImageDto,
} from '~/lib/interfaces/asset/general.interface';
import { FORM_ENUM } from '~/lib/utils/constants';

const generateImagesArray = (
  type: 'create' | 'edit',
  formDetails: AssetFormDetails,
  username: string
) => {
  const images: AssetImageDto[] = [];

  // Handle new images or updates
  formDetails.images.forEach((image) => {
    const imageData: AssetImageDto = {
      imageName: image.imageName as string,
      base64PhotoImage: image.base64PhotoImage,
      isPrimaryImage: image.isPrimaryImage,
      [type === 'create' ? 'createdBy' : 'changeInitiatedBy']: username,
    };

    if (image.imageId) {
      imageData.imageId = image.imageId;
    }

    if (type === 'edit') {
      imageData.assetId = formDetails.assetId as number;
      imageData.actionType = image.imageId ? FORM_ENUM.update : FORM_ENUM.add;
    }

    images.push(imageData);
  });

  return images;
};

const generateDocumentArray = (
  type: 'create' | 'edit',
  formDetails: AssetFormDetails,
  username: string
) => {
  const documents: AssetDocumentsDto[] = [];

  // Handle new images or updates that is not part of the linked existing documents array
  formDetails.documents
    .filter(
      (item) =>
        !formDetails.existingDocumentsIds.includes(item.documentId as number)
    )
    .forEach((document) => {
      const documentData: AssetDocumentsDto = {
        documentName: document.documentName as string,
        base64Document: document.base64Document!,
        [type === 'create' ? 'createdBy' : 'changeInitiatedBy']: username,
      };

      if (document.documentId) {
        documentData.documentId = document.documentId!;
      }

      if (type === 'edit') {
        documentData.actionType = document.documentId
          ? FORM_ENUM.update
          : FORM_ENUM.add;
      }

      documents.push(documentData);
    });

  return documents;
};

const mapIdsToObject = (
  addedIds: number[],
  removedIds: number[]
): Record<number, typeof FORM_ENUM.add | typeof FORM_ENUM.delete> | null => {
  if (addedIds.length === 0 && removedIds.length === 0) {
    return null;
  }
  const addedIdsMapping = addedIds.reduce(
    (acc, id) => {
      acc[id] = FORM_ENUM.add; // FORM_ENUM.add represents "Add"
      return acc;
    },
    {} as Record<number, number>
  );

  const removedIdsMapping = removedIds.reduce(
    (acc, id) => {
      acc[id] = FORM_ENUM.delete; // FORM_ENUM.delete represents "Delete"
      return acc;
    },
    {} as Record<number, number>
  );

  return { ...addedIdsMapping, ...removedIdsMapping };
};

export { generateImagesArray, generateDocumentArray, mapIdsToObject };
