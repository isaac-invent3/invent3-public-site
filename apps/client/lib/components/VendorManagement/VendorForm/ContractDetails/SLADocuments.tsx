import { FormInputWrapper } from '@repo/ui/components';
import { useField } from 'formik';
import DocumentUploadAndView from '~/lib/components/Common/DocumentUploadAndView';
import { Document } from '~/lib/interfaces/general.interfaces';

const SLADocuments = () => {
  const [field, meta, helpers] = useField('slaDocuments'); //eslint-disable-line

  const handleRemoveDocument = (document: Document) => {
    const updatedDocuments: Document[] = meta.value.filter(
      (old: Document) => old !== document
    );
    helpers.setValue(updatedDocuments);
  };

  return (
    <FormInputWrapper
      sectionMaxWidth="141px"
      spacing="24px"
      description="Attach related files to this vendor"
      title="Upload Service Agreement"
      isRequired
    >
      <DocumentUploadAndView
        variant="secondary"
        handleRemoveDocuments={(document) => handleRemoveDocument(document)}
        handleAddDocuments={(documents) =>
          helpers.setValue([...meta.value, ...documents])
        }
        documents={meta.value ?? []}
        setError={(error) => helpers.setError(error)}
        error={meta.error as string}
      />
    </FormInputWrapper>
  );
};

export default SLADocuments;
