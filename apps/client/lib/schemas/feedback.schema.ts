import * as Yup from 'yup';

const createFeedbackSchema = Yup.object({
  createFeedbackDto: Yup.object({
    subject: Yup.string().required('Subject is required'),
    description: Yup.string().required('Description is required'),
    feedbackTypeId: Yup.number().required('Feedback type is required'),
  }),

  createFeedbackAttachmentDto: Yup.array()
    .of(
      Yup.object().shape({
        fileId: Yup.number().nullable(),
        fileName: Yup.string().required(),
        base64: Yup.string().required(),
        base64Prefix: Yup.string().nullable(),
      })
    )
    .required('Feedback Attachments is required')
    .min(1, 'Feedback Attachments must contain at least one item'),
});

const updateFeedbackSchema = Yup.object({
  assignedTo: Yup.string().required('The Feedback must be assigned to a user!'),
  resolutionNote: Yup.string().required(
    'A Resolution Note for the feedback must be created!'
  ),
});

export { createFeedbackSchema, updateFeedbackSchema };
