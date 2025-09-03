import { SimpleGrid, VStack } from '@chakra-ui/react';
import DetailHeader from '~/lib/components/UI/DetailHeader';
import { useAppSelector } from '~/lib/redux/hooks';
import Info from './Info';
import { AUTHENTICATION_PROTOCOL_ENUM } from '~/lib/utils/constants';

const AuthenticationProtocol = () => {
  const { companyAuthProtocolName, companyAuthProtocolId, activeDirectoryUrl } =
    useAppSelector((state) => state.company.companyForm);

  const info = [
    {
      label: 'Authentication Method',
      value: companyAuthProtocolName,
    },
    ...(companyAuthProtocolId === AUTHENTICATION_PROTOCOL_ENUM.ACTIVE_DIRECTORY
      ? [
          {
            label: 'Active Directory URL',
            value: activeDirectoryUrl,
          },
        ]
      : []),
  ];

  return (
    <VStack
      spacing="8px"
      width="full"
      alignItems="flex-start"
      bgColor="#F5F5F5"
      height="full"
      rounded="16px"
      p="16px"
    >
      <DetailHeader variant="primary">Authentication Protocol</DetailHeader>
      <VStack width="full" spacing="24px" alignItems="flex-start">
        <SimpleGrid columns={1} width="full" gap="16px">
          {info.map((item, index) => (
            <Info {...item} key={index} />
          ))}
        </SimpleGrid>
      </VStack>
    </VStack>
  );
};

export default AuthenticationProtocol;
