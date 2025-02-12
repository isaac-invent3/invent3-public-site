import { HStack, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import SummaryInfo from '~/lib/components/Common/SummaryInfo';
import DetailHeader from '~/lib/components/UI/DetailHeader';
import { useAppSelector } from '~/lib/redux/hooks';

const OccupationInfo = () => {
  const {
    employmentTypeName,
    branchName,
    jobTitleName,
    teamName,
    userRoleName,
    userGroupNames,
  } = useAppSelector((state) => state.user.userForm);

  const infoOne = [
    {
      label: 'Employment Type',
      value: employmentTypeName,
    },
    {
      label: 'Branch',
      value: branchName,
    },
    {
      label: 'Job Title',
      value: jobTitleName,
    },
    {
      label: 'Team',
      value: teamName,
    },
  ];
  return (
    <VStack width="full">
      <DetailHeader variant="primary">Occupation Info</DetailHeader>
      <VStack width="full" spacing="20px">
        <SimpleGrid width="full" gap="20px" columns={{ base: 1, md: 2 }}>
          {infoOne.map((item, index) => (
            <SummaryInfo {...item} key={index} />
          ))}
        </SimpleGrid>
        <SimpleGrid width="full" gap="20px" columns={{ base: 1, md: 2 }}>
          <SummaryInfo label="User Role" value={userRoleName} />

          <VStack width="full" spacing="4px" alignItems="flex-start">
            <Text color="neutral.600">User Group</Text>
            <HStack wrap="wrap" spacing="8px">
              {userGroupNames.length > 0 ? (
                userGroupNames.map((item, index) => (
                  <Text
                    key={index}
                    size="md"
                    color="black"
                    bgColor="#E6E6E6"
                    py="8px"
                    px="12px"
                    rounded="16px"
                  >
                    {item}
                  </Text>
                ))
              ) : (
                <Text size="md">N/A</Text>
              )}
            </HStack>
          </VStack>
        </SimpleGrid>
      </VStack>
    </VStack>
  );
};

export default OccupationInfo;
