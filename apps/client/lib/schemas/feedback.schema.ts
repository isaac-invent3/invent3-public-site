import * as Yup from 'yup';

const createFeedbackSchema = Yup.object({
  createFeedbackDto: Yup.object({
    subject: Yup.string().required('Subject is required'),
    description: Yup.string().required('Description is required'),
    feedbackTypeId: Yup.number().required('Feedback type is required'),
  }),
  createFeedbackAttachmentDto: Yup.object()
    .shape({
      fileId: Yup.number().nullable(),
      fileName: Yup.string().required(),
      base64: Yup.string().required(),
      base64Prefix: Yup.string().nullable(),
    })
    .required('Feedback Attachment is required'),
});

export { createFeedbackSchema };
