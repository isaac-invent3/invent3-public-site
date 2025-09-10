import {
  DrawerBody,
  DrawerHeader,
  HStack,
  Skeleton,
  Spinner,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';

import { BackButton, Button, GenericDrawer } from '@repo/ui/components';
import { useMemo } from 'react';
import GenericErrorState from '~/lib/components/UI/GenericErrorState';
import useCustomSearchParams from '~/lib/hooks/useCustomSearchParams';
import { TaskInstance } from '~/lib/interfaces/task.interfaces';
import { useGetTaskInstanceByIdQuery } from '~/lib/redux/services/task/instance.services';
import {
  DEFAULT_PAGE_SIZE,
  SYSTEM_CONTEXT_DETAILS,
} from '~/lib/utils/constants';
import MarkTaskAsCompletedModal from '../../Modals/MarkTaskAsCompletedModal';
import OtherRelatedTasks from './OtherRelatedTasks';
import SectionOne from './SectionOne';
import SectionTwo from './SectionTwo';
import usePermissionAccess from '~/lib/hooks/useRoleAccess';
import ViewAttachement from '~/lib/components/Common/AttachFileAndView/ViewAttachement';
import { useGetTaskDocumentsByIdQuery } from '~/lib/redux/services/task/general.services';
import { useAppSelector } from '~/lib/redux/hooks';

interface TaskDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data?: TaskInstance;
}

const TaskDetailDrawer = (props: TaskDetailDrawerProps) => {
  const { isOpen, onClose, data } = props;
  const {
    isOpen: isOpenMarkAsCompleted,
    onOpen: onOpenMarkAsCompleted,
    onClose: onCLoseMarkAsCompleted,
  } = useDisclosure();
  const taskSlug = SYSTEM_CONTEXT_DETAILS.TASKS.slug;
  const { getSearchParam, clearSearchParamsAfter } = useCustomSearchParams();
  const canMarkTaskAsCompleted = usePermissionAccess('task:mark_completed');

  const taskId = getSearchParam(taskSlug) ?? null;

  const { data: taskInstance, isLoading } = useGetTaskInstanceByIdQuery(
    taskId!,
    {
      skip: !taskId || Boolean(data),
    }
  );
  const { data: taskDocuments, isLoading: isLoadingDocument } =
    useGetTaskDocumentsByIdQuery(
      {
        taskId: taskInstance?.data?.parentTaskId!,
        pageNumber: 1,
        pageSize: DEFAULT_PAGE_SIZE,
      },
      { skip: !taskInstance?.data?.parentTaskId }
    );

  const appConfigValue = useAppSelector(
    (state) => state.general.appConfigValues
  );

  const closeDrawer = () => {
    clearSearchParamsAfter(taskSlug, { removeSelf: true });
    onClose();
  };

  const task = useMemo(() => {
    return data || taskInstance?.data;
  }, [taskInstance, data]);

  const taskNotFound = useMemo(() => {
    const notFound = !task && !isLoading;

    if (notFound) clearSearchParamsAfter(taskSlug);

    return notFound;
  }, [task, isLoading]);

  return (
    <GenericDrawer isOpen={isOpen} onClose={closeDrawer} maxWidth="597px">
      {taskNotFound && (
        <GenericErrorState
          title="Error: Task Not Found!"
          subtitle="The Selected Task Could not be found"
        />
      )}

      {isLoading && !task && (
        <VStack width="full" minH="100vh" justifyContent="center">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="primary.500"
            size="xl"
          />
        </VStack>
      )}

      {task && (
        <>
          <DrawerHeader p={0} m={0}>
            <HStack
              pt="16px"
              pb="29px"
              pl="32px"
              pr="28px"
              width="full"
              justifyContent="space-between"
            >
              <BackButton handleClick={closeDrawer} />

              {canMarkTaskAsCompleted &&
                task?.currentStatusId !==
                  +appConfigValue?.DEFAULT_COMPLETED_TASK_STATUS_ID! && (
                  <Button
                    handleClick={onOpenMarkAsCompleted}
                    customStyles={{ width: '138px', height: '35px' }}
                  >
                    Mark as completed
                  </Button>
                )}
            </HStack>
          </DrawerHeader>
          <DrawerBody p={0}>
            <VStack
              width="full"
              alignItems="flex-start"
              spacing="32px"
              pb="20px"
            >
              <SectionOne data={task} />
              <VStack
                width="full"
                alignItems="flex-start"
                spacing="32px"
                px={{ base: '24px', md: '42px' }}
              >
                <SectionTwo data={task} />
                <OtherRelatedTasks data={task} />
                {isLoadingDocument && <Skeleton width="full" height="100px" />}
                {taskDocuments?.data &&
                  taskDocuments?.data?.items.length > 0 && (
                    <ViewAttachement
                      attachement={{
                        documentId: taskDocuments?.data?.items[0]?.documentId!,
                        documentName:
                          taskDocuments?.data?.items[0]?.documentName!,
                        base64Document:
                          taskDocuments?.data?.items[0]?.document!,
                        base64Prefix:
                          taskDocuments?.data?.items[0]?.base64Prefix!,
                      }}
                      handleRemoveDocument={() => {}}
                    />
                  )}
              </VStack>
            </VStack>
            <MarkTaskAsCompletedModal
              isOpen={isOpenMarkAsCompleted}
              onClose={onCLoseMarkAsCompleted}
              data={task}
              closeDrawer={closeDrawer}
            />
          </DrawerBody>
        </>
      )}
    </GenericDrawer>
  );
};

export default TaskDetailDrawer;
