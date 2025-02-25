import { Flex, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import PlanDetailsModal from '~/lib/components/Maintenance/Plans/Drawers/PlanDetailDrawer';
import MaintenancePlanTable from '~/lib/components/Maintenance/Plans/PlanTable';
import PopoverAction from '~/lib/components/Maintenance/Plans/PopoverAction';
import useCustomSearchParams from '~/lib/hooks/useCustomSearchParams';
import { useGetAllMaintenancePlanQuery } from '~/lib/redux/services/maintenance/plan.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';

export const initialFilterData = {
  planType: [],
  region: [],
  area: [],
  branch: [],
  startDate: undefined,
  endDate: undefined,
};

const MaintenancePlanTableView = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { data, isLoading, isFetching } = useGetAllMaintenancePlanQuery({
    pageSize,
    pageNumber: currentPage,
  });
  const { getSearchParam } = useCustomSearchParams();
  const maintenancePlanId = getSearchParam('maintenancePlanId');
  const { isOpen, onOpen, onClose } = useDisclosure();

  //Open Plan detail drawer if plan id exists
  useEffect(() => {
    if (maintenancePlanId !== undefined) {
      onOpen();
    }
  }, [maintenancePlanId]);

  return (
    <Flex direction="column" pt="16px" width="full">
      <MaintenancePlanTable
        data={data?.data?.items ?? []}
        totalPages={data?.data?.totalPages}
        showFooter={true}
        emptyLines={15}
        isSelectable={false}
        isLoading={isLoading}
        isFetching={isFetching}
        pageNumber={currentPage}
        setPageNumber={setCurrentPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        PopoverComponent={(plan) => PopoverAction(plan, 'history')}
      />
      {maintenancePlanId && (
        <PlanDetailsModal
          isOpen={isOpen}
          onClose={onClose}
          data={null}
          planId={+maintenancePlanId}
        />
      )}
    </Flex>
  );
};

export default MaintenancePlanTableView;
