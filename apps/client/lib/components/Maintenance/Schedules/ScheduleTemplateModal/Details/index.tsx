import { Flex, Heading, Skeleton, VStack } from '@chakra-ui/react';

import { Button } from '@repo/ui/components';
import { Template } from '~/lib/interfaces/template.interfaces';
import { useGetMaintenenanceScheduleInfoHeaderByScheduleIDQuery } from '~/lib/redux/services/maintenance/schedule.services';
import ScheduleInfo from './ScheduleInfo';
import HeaderInfo from './HeaderInfo';
import { ROUTES } from '~/lib/utils/constants';

interface DetailsProps {
  template: Template;
}
const Details = (props: DetailsProps) => {
  const { template } = props;
  const { data, isLoading } =
    useGetMaintenenanceScheduleInfoHeaderByScheduleIDQuery(
      { id: template.contextId },
      {
        skip: !template.contextId,
      }
    );
  return (
    <VStack
      width="full"
      alignItems="flex-start"
      pt="14px"
      pb="19px"
      px="16px"
      spacing="16px"
      mt="8px"
      rounded="6px"
      mb="16px"
    >
      <Heading fontWeight={800} fontSize="18px" lineHeight="21.38px">
        Template's Detail
      </Heading>
      {isLoading ? (
        <Skeleton width="full" height="400px" rounded="8px" />
      ) : (
        data?.data && (
          <VStack width="full" alignItems="flex-start" spacing={0}>
            <HeaderInfo data={data?.data} />
            <VStack
              width="full"
              alignItems="flex-start"
              pt="26px"
              spacing="16px"
              px="8px"
              pb="32px"
              borderTop="0px"
              borderWidth="1px"
              borderColor="neutral.300"
              borderBottomRadius="8px"
            >
              <VStack alignItems="flex-start" width="full" spacing="8px">
                <ScheduleInfo schedule={data?.data} />
              </VStack>

              <Flex width="full" justifyContent="flex-end">
                <Button
                  customStyles={{ width: '161px' }}
                  href={`/${ROUTES.MAINTENANCE}/${ROUTES.MAINTENANCE_SCHEDULES}/add?template=${data?.data?.scheduleGuid}`}
                >
                  Use Template
                </Button>
              </Flex>
            </VStack>
          </VStack>
        )
      )}
    </VStack>
  );
};

export default Details;
