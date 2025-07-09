import {
  Flex,
  HStack,
  Skeleton,
  StackDivider,
  Tab,
  TabList,
  Tabs,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FilterButton } from '@repo/ui/components';
import { useState } from 'react';
import { ApprovalWorkflowType } from '~/lib/interfaces/approvalWorkflow.interfaces';
import { useGetAllApprovalWorkflowTypesQuery } from '~/lib/redux/services/approval-workflow/types.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { FilterIcon } from '../CustomIcons';
import PageHeader from '../UI/PageHeader';

interface ApprovalHeaderProps {
  setSelectedApprovalType: React.Dispatch<
    React.SetStateAction<ApprovalWorkflowType | null>
  >;
}

const Header = (props: ApprovalHeaderProps) => {
  const [tabIndex, setTabIndex] = useState(0);

  const { setSelectedApprovalType } = props;

  const { data, isLoading } = useGetAllApprovalWorkflowTypesQuery({
    pageNumber: 1,
    pageSize: DEFAULT_PAGE_SIZE,
  });

  return (
    <VStack
      width="full"
      justifyContent="space-between"
      pt="40px"
      flexWrap="wrap"
      spacing="24px"
      alignItems="flex-start"
      px={{ base: '20px', md: 0 }}
    >
      <PageHeader>Approval Requests</PageHeader>

      <Flex
        alignItems="center"
        justifyContent="space-between"
        gap={{ base: '20px', md: '40px' }}
        width="full"
        flexWrap="wrap"
      >
        <HStack
          spacing="16px"
          alignItems="flex-start"
          maxW="full"
          overflow="hidden"
        >
          <Text color="neutral.800" fontWeight="700" size="lg">
            Type:
          </Text>

          <Tabs
            variant="custom"
            width={'full'}
            onChange={(index) => setTabIndex(index)}
            index={tabIndex}
            overflow="auto"
          >
            <TabList>
              <HStack
                divider={
                  <StackDivider
                    borderColor="#A6A6A6"
                    height="20px"
                    alignSelf="center"
                  />
                }
              >
                {data?.data.items.map((tab, index) => {
                  const tabActive = tabIndex === index;

                  return (
                    <Skeleton isLoaded={!isLoading}>
                      <Tab
                        paddingBottom="8px"
                        key={index}
                        onClick={() => setSelectedApprovalType(tab)}
                      >
                        <HStack>
                          <Text
                            color={tabActive ? '#0E2642' : '#838383'}
                            fontWeight={tabActive ? 700 : 500}
                            transition="all 300ms ease-in-out"
                            size="md"
                          >
                            {tab.approvalTypeName}
                          </Text>

                          {/* <Flex
                          color={tabActive ? 'white' : 'black'}
                          bgColor={tabActive ? '#0E2642' : '#BBBBBB'}
                          transition="all 300ms ease-in-out"
                          borderRadius="16px"
                          width="30px"
                          height="22px"
                          alignItems="center"
                          justifyContent="center"
                          ml="8px"
                          opacity={tabActive ? 1 : 0.5}
                        >
                          <Text size={tabActive ? 'md' : 'base'}>
                            {tab.count}
                          </Text>
                        </Flex> */}
                        </HStack>
                      </Tab>
                    </Skeleton>
                  );
                })}
              </HStack>
            </TabList>
          </Tabs>
        </HStack>
        {/* <FilterButton
          icon={FilterIcon}
          label="Filters"
          handleClick={() => console.log('hey')}
          isActive={false}
        /> */}
      </Flex>
    </VStack>
  );
};

export default Header;
