import { Heading, VStack } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import AllEventTypes from './AllEventTypes';
import { useGetWebhookSystemModuleContextPermissionsQuery } from '~/lib/redux/services/webhook.services';
import { setInitialOptions } from '~/lib/redux/slices/RoleSlice';
import { RoleModulePermission } from '~/lib/interfaces/role.interfaces';
import { useAppDispatch } from '~/lib/redux/hooks';

const EventType = ({ companyWebhookUrl }: { companyWebhookUrl?: number }) => {
  const { data: webhookPermissions, isLoading: isLoadingPermissions } =
    useGetWebhookSystemModuleContextPermissionsQuery(
      { webhookIds: [companyWebhookUrl!], pageSize: 100 },
      { skip: !companyWebhookUrl }
    );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (webhookPermissions) {
      const transformedPermissions: RoleModulePermission[] =
        webhookPermissions?.data?.items.map((item) => ({
          roleSystemModuleContextPermissionId:
            item.webhookSystemModuleContextPermissionId,
          systemModuleContextTypeId: item.systemModuleContextTypeId,
          systemSubModuleContextTypeId: item.systemSubModuleContextTypeId,
        }));
      dispatch(setInitialOptions(transformedPermissions));
    }
  }, [webhookPermissions]);

  return (
    <VStack width="full" alignItems="flex-start" spacing="24px">
      <Heading size="lg" color="primary.500" fontWeight={700}>
        Event Type
      </Heading>
      <AllEventTypes />
    </VStack>
  );
};

export default EventType;
