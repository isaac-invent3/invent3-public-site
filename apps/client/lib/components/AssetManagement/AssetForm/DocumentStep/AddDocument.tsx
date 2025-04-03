import { useDisclosure } from '@chakra-ui/react';
import { useField } from 'formik';
import ExistingDocumentModal from './ExistingDocumentModal';
import DocumentUploadAndView from '~/lib/components/Common/DocumentUploadAndView';
import { updateAssetForm } from '~/lib/redux/slices/AssetSlice';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { Document } from '~/lib/interfaces/general.interfaces';

interface AddDocumentProps {
  variant?: 'primary' | 'secondary';
  // eslint-disable-next-line no-unused-vars
  handleNewExistingDocumentsIds?: (ids: number[]) => void;
}

const AddDocument = (props: AddDocumentProps) => {
  const { variant, handleNewExistingDocumentsIds } = props;
  const [field, meta, helpers] = useField('documents'); // eslint-disable-line
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();
  const { existingDocumentsIds, deletedExistingDocumentIds } = useAppSelector(
    (state) => state.asset.assetForm
  );

  const handleRemoveDocument = (document: Document) => {
    const updatedDocuments: Document[] = meta.value.filter(
      (old: Document) => old !== document
    );
    helpers.setValue(updatedDocuments);

    const isInExistingDocumentArray = existingDocumentsIds.includes(
      document.documentId as number
    );

    const updatedDeletedDocuments = isInExistingDocumentArray
      ? deletedExistingDocumentIds
      : [...deletedExistingDocumentIds, document.documentId as number];

    // Dispatch the updated state
    dispatch(
      updateAssetForm({
        existingDocumentsIds: existingDocumentsIds.filter(
          (item) => item != (document.documentId as number)
        ),
        deletedExistingDocumentIds: updatedDeletedDocuments,
      })
    );
  };

  return (
    <>
      <DocumentUploadAndView
        variant={variant}
        handleRemoveDocuments={(document) => handleRemoveDocument(document)}
        handleAddDocuments={(documents) => helpers.setValue(documents)}
        documents={meta.value}
        setError={(error) => helpers.setError(error)}
        error={meta.error}
        handleOpenExistingDocumentModal={onOpen}
      />
      <ExistingDocumentModal
        isOpen={isOpen}
        onClose={onClose}
        handleNewExistingDocumentsIds={(ids) =>
          handleNewExistingDocumentsIds && handleNewExistingDocumentsIds(ids)
        }
      />
    </>
  );
};

export default AddDocument;
