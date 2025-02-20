import { FormInputWrapper } from '@repo/ui/components';
import { useField } from 'formik';
import DocumentUploadAndView from '~/lib/components/Common/DocumentUploadAndView';
import { Document } from '~/lib/interfaces/general.interfaces';

const VendorDocuments = () => {
  const [field, meta, helpers] = useField('vendorDocuments'); //eslint-disable-line

  const handleRemoveDocument = (document: Document) => {
    const updatedDocuments: Document[] = meta.value.filter(
      (old: Document) => old !== document
    );
    console.log({ remove: updatedDocuments });
    helpers.setValue(updatedDocuments);
  };

  return (
    <FormInputWrapper
      sectionMaxWidth="141px"
      customSpacing="24px"
      description="Attach related files to this vendor"
      title="Vendor Documents"
      isRequired
    >
      <DocumentUploadAndView
        variant="secondary"
        handleRemoveDocuments={(document) => handleRemoveDocument(document)}
        handleAddDocuments={(documents) => {
          helpers.setValue([...meta.value, ...documents]);
        }}
        documents={meta.value ?? []}
        setError={(error) => helpers.setError(error)}
        error={meta.error as string}
      />
    </FormInputWrapper>
  );
};

export default VendorDocuments;
