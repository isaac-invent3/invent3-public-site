import { DrawerBody, DrawerHeader, VStack } from '@chakra-ui/react';
import { GenericDrawer, LoadingSpinner } from '@repo/ui/components';
import { useMemo } from 'react';
import useCustomSearchParams from '~/lib/hooks/useCustomSearchParams';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { SYSTEM_CONTEXT_DETAILS } from '~/lib/utils/constants';
import GenericErrorState from '../../UI/GenericErrorState';
import { useGetAuditRecordByIdQuery } from '~/lib/redux/services/log.services';
import { setAuditLog } from '~/lib/redux/slices/AuditLogSlice';
import LogHeader from './Header';
import AuditLogInfo from './AuditLogInfo';
import AuditLogTabs from './AuditLogTabs';

interface LogDetailProps {
  isOpen: boolean;
  onClose: () => void;
}

const LogDetail = ({ isOpen, onClose }: LogDetailProps) => {
  const dispatch = useAppDispatch();
  const logSlug = SYSTEM_CONTEXT_DETAILS.AUDIT.slug;
  const selectedAuditLog = useAppSelector((state = state.auditLog));
  const { getSearchParam, clearSearchParamsAfter } = useCustomSearchParams();

  const logId = getSearchParam(logSlug)
    ? Number(getSearchParam(logSlug))
    : null;

  const {
    data: logData,
    isLoading,
    isFetching,
  } = useGetAuditRecordByIdQuery(
    { id: logId! },
    {
      skip: !logId || Boolean(selectedAuditLog),
    }
  );

  const closeDrawer = () => {
    clearSearchParamsAfter(logSlug, { removeSelf: true });
    onClose();
  };

  const log = useMemo(() => {
    if (logData?.data && !selectedAuditLog)
      dispatch(setAuditLog(logData?.data));

    return selectedAuditLog || logData?.data;
  }, [logData, selectedAuditLog]);

  const logNotFound = useMemo(() => {
    const notFound = !log && !isLoading && !isFetching;

    if (notFound) clearSearchParamsAfter(logSlug);

    return notFound;
  }, [log, isLoading]);

  return (
    <GenericDrawer
      isOpen={isOpen}
      onClose={closeDrawer}
      maxWidth="850px"
      customStyle={{ trapFocus: true }}
    >
      {logNotFound && (
        <GenericErrorState
          title="Error: Log Not Found!"
          subtitle="The Selected Log Could not be found"
        />
      )}

      {isLoading && !log && (
        <VStack width="full" minH="100vh" justifyContent="center">
          <LoadingSpinner />
        </VStack>
      )}

      {log && (
        <>
          <DrawerHeader
            px={{ base: '16px', lg: '32px' }}
            pt="16px"
            pb={{ base: '16px', lg: '29px' }}
          >
            <LogHeader handleBack={closeDrawer} />
          </DrawerHeader>
          <DrawerBody p={0}>
            <VStack
              width="full"
              alignItems="flex-start"
              spacing={{ base: '24px', lg: '59px' }}
            >
              <AuditLogInfo />
              <AuditLogTabs />
            </VStack>
          </DrawerBody>
        </>
      )}
    </GenericDrawer>
  );
};

export default LogDetail;
