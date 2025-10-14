import {
  Flex,
  Heading,
  HStack,
  Skeleton,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import moment from 'moment';
import { ReactBarcode, Renderer } from 'react-jsbarcode';
import GenericStatusBox from '~/lib/components/UI/GenericStatusBox';
import { useAppSelector } from '~/lib/redux/hooks';

const getDurationLabel = (lifeCycleStageChangeDate: string | Date) => {
  const start = moment(lifeCycleStageChangeDate);
  const now = moment();

  if (start.isAfter(now)) return '0 months';

  const totalMonths = now.diff(start, 'months', true);
  const years = Math.floor(totalMonths / 12);
  const months = Math.floor(totalMonths % 12);

  const parts: string[] = [];
  if (years > 0) parts.push(`${years} ${years === 1 ? 'year' : 'years'}`);
  if (months > 0) parts.push(`${months} ${months === 1 ? 'month' : 'months'}`);

  return parts.length ? parts.join(', ') : '0 months';
};

const Overview = () => {
  const {
    asset: assetData,
    assetImages,
    generalInfo,
  } = useAppSelector((state) => state.asset);

  if (!assetData) {
    return null;
  }

  const primaryImage = assetImages?.find((item) => item.isPrimaryImage);

  const {
    currentStatus,
    assetName,
    assetId,
    lifeCycleStageName,
    lifeCycleStageChangeDate,
    lifeCycleColorCode,
    brandName,
    displayColorCode,
    assetCode,
    riskScoreName,
    riskScoreColor,
    isCritical,
    serialNo,
    modelRef,
  } = assetData;

  const assetInfo1 = [
    {
      label: 'Make:',
      value: brandName ?? 'N/A',
    },
    {
      label: 'Model:',
      value: modelRef ?? 'N/A',
    },
    {
      label: 'Serial Number:',
      value: serialNo ?? 'N/A',
    },
  ];

  const assetInfo2 = [
    {
      label: 'Asset ID:',
      value: assetId ?? 'N/A',
    },
    {
      label: 'Time in Stage:',
      value: lifeCycleStageChangeDate
        ? getDurationLabel(lifeCycleStageChangeDate)
        : 'N/A',
    },
  ];

  return (
    <Stack
      width="full"
      py={{ base: '16px', md: '24px' }}
      px={{ base: '16px' }}
      bgColor="white"
      spacing="24px"
      alignItems="flex-start"
      direction={{ base: 'column', sm: 'row' }}
      rounded="8px"
    >
      <VStack>
        {generalInfo.loadingImage ? (
          <Skeleton
            height={{ base: '97px', md: '175px' }}
            width={{ base: '120px', md: '216px' }}
            rounded="16px"
            bgColor="white"
            overflow="hidden"
            flexShrink={0}
          />
        ) : (
          <Flex
            height={{ base: '97px', md: '175px' }}
            width={{ base: '120px', md: '216px' }}
            rounded="16px"
            bgColor="#E6E6E6"
            overflow="hidden"
            flexShrink={0}
            objectFit="cover"
          >
            <Flex
              width="full"
              height="full"
              bgSize="contain"
              bgRepeat="no-repeat"
              bgPosition="center"
              mx="8px"
              bgImage={`${primaryImage?.base64Prefix}${primaryImage?.photoImage}`}
            />
          </Flex>
        )}
        <GenericStatusBox
          text="Anomally Detected"
          colorCode="#f50000"
          showDot={false}
          rounded="full"
          useColorCodeAsTextColor
          bgColor="none"
          border="none"
        />
      </VStack>
      <VStack alignItems="flex-start" width="full" spacing="16px">
        <HStack width="full" justifyContent="space-between">
          <HStack spacing="16px" width="full">
            <Heading
              as="h3"
              size={{ base: 'lg', md: 'xl' }}
              fontWeight={{ base: 700, md: 800 }}
            >
              {assetName}
            </Heading>
            <GenericStatusBox
              text={currentStatus}
              colorCode={displayColorCode}
              showDot={false}
              useColorCodeAsTextColor={true}
              rounded="full"
            />
          </HStack>
          <Flex
            bgColor="white"
            height={{ base: '37px', md: '50px' }}
            width={{ base: '92px', md: '121px' }}
          >
            <ReactBarcode
              value={assetId ? assetId.toString() : ''}
              renderer={Renderer.CANVAS}
              options={{ displayValue: false, margin: 0 }}
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </Flex>
        </HStack>
        <Stack
          width="full"
          direction={{ base: 'column', md: 'row' }}
          spacing={{ base: '8px', md: '42px' }}
          alignItems="flex-start"
        >
          <VStack alignItems="flex-start" spacing="8px">
            {assetInfo1.map((info, index) => (
              <HStack spacing="8px" alignItems="flex-start" key={index}>
                <Text color="neutral.600" minW="110px" size="md">
                  {info.label}
                </Text>
                <Text color="black" size="md">
                  {info.value}
                </Text>
              </HStack>
            ))}
            <HStack
              spacing="8px"
              alignItems="center"
              display={{ base: 'none', md: 'flex' }}
            >
              <Text color="neutral.600" minW="110px" size="md">
                LifeCycle Stage:
              </Text>
              {lifeCycleStageName ? (
                <GenericStatusBox
                  text={lifeCycleStageName}
                  colorCode={lifeCycleColorCode}
                  showDot={false}
                  rounded="full"
                  useColorCodeAsTextColor
                />
              ) : (
                <Text color="black" size="md">
                  N/A
                </Text>
              )}
            </HStack>
          </VStack>
          <VStack alignItems="flex-start" spacing="8px">
            <HStack spacing="8px" alignItems="center">
              <Text color="neutral.600" minW="110px" size="md">
                Asset Code:
              </Text>
              {assetCode ? (
                <HStack spacing="7px">
                  <Text color="black" size="md" width="110px">
                    {assetCode}
                  </Text>
                  {isCritical && (
                    <GenericStatusBox
                      text="Critical"
                      colorCode="#F50000"
                      showDot={false}
                      rounded="full"
                      useColorCodeAsTextColor
                    />
                  )}
                </HStack>
              ) : (
                <Text color="black" size="md">
                  N/A
                </Text>
              )}
            </HStack>
            {assetInfo2.map((info, index) => (
              <HStack spacing="12px" alignItems="flex-start" key={index}>
                <Text color="neutral.600" width="110px" size="md">
                  {info.label}
                </Text>
                <Text color="black" size="md">
                  {info.value}
                </Text>
              </HStack>
            ))}
            <HStack spacing="12px" alignItems="flex-start">
              <Text color="neutral.600" width="110px" size="md">
                Risk Indicator:
              </Text>
              {riskScoreName ? (
                <GenericStatusBox
                  text={riskScoreName}
                  colorCode={riskScoreColor}
                  showDot={false}
                  rounded="full"
                />
              ) : (
                'N/A'
              )}
            </HStack>
            <HStack
              spacing="8px"
              alignItems="center"
              display={{ base: 'flex', md: 'none' }}
            >
              <Text color="neutral.600" minW="110px" size="md">
                LifeCycle Stage:
              </Text>
              {lifeCycleStageName ? (
                <GenericStatusBox
                  text={lifeCycleStageName}
                  colorCode={lifeCycleColorCode}
                  showDot={false}
                  rounded="full"
                  useColorCodeAsTextColor
                />
              ) : (
                <Text color="black" size="md">
                  N/A
                </Text>
              )}
            </HStack>
          </VStack>
        </Stack>
      </VStack>
    </Stack>
  );
};

export default Overview;
