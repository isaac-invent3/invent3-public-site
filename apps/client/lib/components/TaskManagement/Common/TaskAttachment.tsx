import { VStack } from '@chakra-ui/react';
import { ErrorMessage, FormInputWrapper } from '@repo/ui/components';
import { useField, useFormikContext } from 'formik';
import UserDisplayAndAddButton from '../../Common/UserDisplayAndAddButton';
import AttachFile from '../../Common/AttachFileAndView/AttachFile';

interface TaskAttachmentProps {
  sectionMaxWidth: string;
  spacing: string;
}
const TaskAttachment = (props: TaskAttachmentProps) => {
  const { sectionMaxWidth, spacing } = props;
  const { setFieldValue, values, submitCount } = useFormikContext<any>();
  // eslint-disable-next-line no-unused-vars
  const [field, meta, helpers] = useField('document');

  return (
    <FormInputWrapper
      sectionMaxWidth={sectionMaxWidth}
      customSpacing={spacing}
      title="Attach File"
      description="Attach any relevant files to this task"
    >
      <VStack width="full" spacing="4px" alignItems="flex-start">
        <AttachFile
          document={meta.value ?? undefined}
          handleAddDocuments={(document) => {
            helpers.setValue(document);
          }}
          handleRemoveDocuments={() => {
            helpers.setValue(null);
          }}
        />
        {submitCount > 0 && meta.touched && meta.error !== undefined && (
          <ErrorMessage>{meta.error}</ErrorMessage>
        )}
      </VStack>
    </FormInputWrapper>
  );
};

export default TaskAttachment;
