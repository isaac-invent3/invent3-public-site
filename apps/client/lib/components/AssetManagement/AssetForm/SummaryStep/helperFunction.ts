import {
  AssetDocument,
  AssetFormDetails,
  AssetImage,
} from '~/lib/interfaces/asset.interfaces';
import { FORM_ENUM } from '~/lib/utils/constants';

interface Base {
  assetId?: number;
  actionType?: (typeof FORM_ENUM)[keyof typeof FORM_ENUM];
  createdBy?: string;
  lastModifiedBy?: string | null;
}

interface BaseImage {
  imageId?: number;
  imageName: string;
  base64PhotoImage?: string;
  isPrimaryImage?: boolean;
}

interface BaseDocument {
  documentId?: number;
  documentName: string;
  base64Document?: string | null;
}

interface Image extends Base, BaseImage {}
interface Document extends Base, BaseDocument {}

const generateImagesArray = (
  type: 'create' | 'edit',
  formDetails: AssetFormDetails,
  existingImages: AssetImage[],
  username: string
) => {
  type FormImage = Image & {
    changeInitiatedBy?: string;
  };
  const images: FormImage[] = [];

  // Handle new images or updates
  formDetails.images.forEach((image) => {
    const imageData: Image = {
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

  // Handle deletions in edit mode
  if (type === 'edit') {
    existingImages.forEach((assetImage) => {
      const imageExists = images.some(
        (image) => image.imageId === assetImage.imageId
      );
      if (!imageExists) {
        images.push({
          imageId: assetImage.imageId,
          imageName: assetImage.imageName,
          assetId: assetImage.assetId,
          actionType: FORM_ENUM.delete,
          changeInitiatedBy: username,
        });
      }
    });
  }

  return images;
};

const generateDocumentArray = (
  type: 'create' | 'edit',
  formDetails: AssetFormDetails,
  existingDocuments: AssetDocument[],
  username: string
) => {
  type FormDocument = Document & {
    changeInitiatedBy?: string;
  };
  const documents: FormDocument[] = [];

  // Handle new images or updates
  formDetails.documents.forEach((document) => {
    const documentData: Document = {
      documentName: document.documentName as string,
      base64Document: document.base64Document,
      [type === 'create' ? 'createdBy' : 'changeInitiatedBy']: username,
    };

    if (document.documentId) {
      documentData.documentId = document.documentId;
    }

    if (type === 'edit') {
      documentData.assetId = formDetails.assetId as number;
      documentData.actionType = document.documentId
        ? FORM_ENUM.update
        : FORM_ENUM.add;
    }

    documents.push(documentData);
  });

  // Handle deletions in edit mode
  if (type === 'edit') {
    existingDocuments.forEach((assetDocument) => {
      const documentExists = documents.some(
        (document) => document.documentId === assetDocument.documentId
      );
      if (!documentExists) {
        documents.push({
          documentId: assetDocument.documentId,
          documentName: assetDocument.documentName,
          assetId: assetDocument.assetId,
          actionType: FORM_ENUM.delete,
          changeInitiatedBy: username,
        });
      }
    });
  }

  return documents;
};

export { generateImagesArray, generateDocumentArray };
