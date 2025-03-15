import {
  DrawerBody,
  DrawerHeader,
  Flex,
  Heading,
  HStack,
  Stack,
} from '@chakra-ui/react';
import { BackButton, Button, GenericDrawer } from '@repo/ui/components';
import { FormikProvider, useFormik } from 'formik';
import { Feedback } from '~/lib/interfaces/feedback.interfaces';
import FeedbackDrawerHeader from '../Common/FeedbackDrawerHeader';

interface FeedbackDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: Feedback;
}

const ViewFeedbackDrawer = (props: FeedbackDrawerProps) => {
  const { isOpen, onClose, data } = props;

  const handleClose = () => {
    onClose();
  };

  const formik = useFormik({
    initialValues: {},
    onSubmit(values, formikHelpers) {},
  });

  return (
    <>
      <GenericDrawer isOpen={isOpen} onClose={handleClose} maxWidth="507px">
        <DrawerHeader p={0} m={0}>
          <Stack
            pt="16px"
            pb="32px"
            px={{ base: '16px', lg: '24px' }}
            width="full"
            justifyContent="space-between"
            direction={{ base: 'row' }}
          >
            <BackButton handleClick={handleClose} />

            <HStack spacing="8px">
              <Button customStyles={{ width: '107px', height: '35px' }}>
                Save Changes
              </Button>

              <Button
                customStyles={{ width: '139px', height: '35px' }}
                variant="secondary"
              >
                Mark as Completed
              </Button>
            </HStack>
          </Stack>
        </DrawerHeader>

        <Flex direction="column" width="full">
          <FormikProvider value={formik}>
            <DrawerBody p={0} m={0}>
              <Flex
                direction="column"
                width="full"
                alignItems="flex-start"
                pb="20px"
              >
                <Heading
                  size={{ base: 'lg', lg: 'xl' }}
                  color="#0E2642"
                  fontWeight={800}
                  px="24px"
                  pb="16px"
                >
                  Feedback Detail
                </Heading>

                <FeedbackDrawerHeader data={data} />
              </Flex>
            </DrawerBody>
          </FormikProvider>
        </Flex>
      </GenericDrawer>
    </>
  );
};

export default ViewFeedbackDrawer;
