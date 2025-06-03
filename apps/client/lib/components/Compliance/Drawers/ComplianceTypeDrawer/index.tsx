import {
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  Flex,
  Heading,
  HStack,
  Icon,
  Skeleton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import {
  BackButton,
  Button,
  CheckBox,
  GenericDrawer,
} from '@repo/ui/components';
import { AddIcon } from '~/lib/components/CustomIcons';
import AddComplianceModal from '../../Modals/AddComplianceModal';
import {
  useGetAllComplianceByTypeQuery,
  useGetAllComplianceTypesQuery,
} from '~/lib/redux/services/asset/compliance.services';
import { useEffect, useState } from 'react';
import PopoverAction from './PopoverAction';

interface ComplianceTypeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const ComplianceTypeDrawer = (props: ComplianceTypeDrawerProps) => {
  const { isOpen, onClose } = props;
  const {
    isOpen: isOpenAddCompliance,
    onOpen: onOpenAddCompliance,
    onClose: onCloseAddCompliance,
  } = useDisclosure();
  const { data, isLoading } = useGetAllComplianceTypesQuery({ pageSize: 50 });
  const [tabIndex, setTabIndex] = useState(0);
  const [selectedComplianceType, setSelectedComplianceType] = useState<
    number | null
  >(null);
  const {
    data: complianceData,
    isLoading: isLoadingCompliance,
    isFetching,
  } = useGetAllComplianceByTypeQuery(
    { complianceTypeId: selectedComplianceType! },
    { skip: !selectedComplianceType }
  );

  useEffect(() => {
    if (data?.data) {
      setSelectedComplianceType(
        data?.data?.items?.[0]?.complianceTypeId ?? null
      );
    }
  }, [data]);

  return (
    <>
      <GenericDrawer isOpen={isOpen} onClose={onClose} maxWidth="627px">
        <DrawerHeader p={0} m={0}>
          <HStack
            pt="16px"
            pb="40px"
            px="24px"
            width="full"
            justifyContent="space-between"
          >
            <BackButton handleClick={onClose} />
            <Button
              handleClick={onOpenAddCompliance}
              customStyles={{
                width: '184px',
                height: { base: '36px', md: 'min-content' },
                alignSelf: 'end',
              }}
            >
              <Icon as={AddIcon} boxSize="18px" color="#D2FEFD" mr="4px" />
              Add Compliance Type
            </Button>
          </HStack>
        </DrawerHeader>
        <DrawerBody p={0} px="24px">
          <Flex direction="column" width="full" alignItems="flex-start">
            <VStack alignItems="flex-start" spacing="8px" mb="63px">
              <Heading
                size={{ base: 'lg', lg: 'xl' }}
                color="primary.500"
                fontWeight={800}
              >
                Compliance Type
              </Heading>
              <Text color="neutral.700" fontWeight={400} size="md">
                Manage the regulatory or internal compliance types assigned to
                your facility operations.
              </Text>
            </VStack>

            <Tabs
              variant="custom"
              onChange={(index) => setTabIndex(index)}
              width={'full'}
              index={tabIndex}
            >
              <TabList>
                {data?.data?.items.map((item) => (
                  <Tab
                    paddingBottom="10px"
                    key={item.complianceTypeId}
                    onClick={() =>
                      setSelectedComplianceType(item.complianceTypeId)
                    }
                  >
                    {item.typeName}
                  </Tab>
                ))}
              </TabList>

              <TabPanels>
                {data?.data?.items.map((item) => (
                  <TabPanel>
                    <VStack width="full" spacing="40px" pt="40px">
                      {(isLoadingCompliance || isFetching) &&
                        Array(4)
                          .fill('')
                          .map((_, index) => (
                            <Skeleton width="full" height="50px" key={index} />
                          ))}

                      {!isLoadingCompliance &&
                        !isFetching &&
                        complianceData?.data?.items.length == 0 && (
                          <Text
                            width="full"
                            py="10vh"
                            textAlign="center"
                            size="lg"
                            color="neutral.600"
                          >
                            No Data
                          </Text>
                        )}
                      {!isLoadingCompliance &&
                        !isFetching &&
                        complianceData &&
                        complianceData.data.items.map((item, index) => (
                          <HStack
                            width="full"
                            justifyContent="space-between"
                            key={index}
                          >
                            <Text
                              fontWeight={700}
                              color="primary.500"
                              size="md"
                              lineHeight="100%"
                              maxW="70%"
                            >
                              {item.standard}
                            </Text>
                            <PopoverAction data={item} />
                          </HStack>
                        ))}
                    </VStack>
                  </TabPanel>
                ))}
              </TabPanels>
            </Tabs>
          </Flex>
        </DrawerBody>
      </GenericDrawer>
      <AddComplianceModal
        onClose={onCloseAddCompliance}
        isOpen={isOpenAddCompliance}
      />
    </>
  );
};

export default ComplianceTypeDrawer;
