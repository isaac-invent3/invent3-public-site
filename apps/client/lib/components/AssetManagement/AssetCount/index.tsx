'use client';

import { Flex, Grid, Stack, Text, useMediaQuery } from '@chakra-ui/react';
import { Select } from '@repo/ui/components';
import { DesktopIcon } from '../../CustomIcons';
import PageHeader from '../../UI/PageHeader';
import AssetCountCard from './AssetCountCard';

const AssetCount = () => {
  const [isMobile] = useMediaQuery('(max-width: 480px)');

  const data = [
    { title: 'IT Equipment', value: '750,000', icon: DesktopIcon },
    { title: 'Office Equipment', value: '550,000', icon: DesktopIcon },
    { title: 'Vehicles', value: '50,000', icon: DesktopIcon },
    { title: 'Heavy Machinery', value: '20,000', icon: DesktopIcon },
    { title: 'Facilities', value: '750,000', icon: DesktopIcon },
    { title: 'Infrastructures', value: '750,000', icon: DesktopIcon },
    { title: 'HVAC Systems', value: '750,000', icon: DesktopIcon },
    { title: 'IT Equipment', value: '750,000', icon: DesktopIcon },
    { title: 'IT Equipment', value: '750,000', icon: DesktopIcon },
    { title: 'IT Equipment', value: '750,000', icon: DesktopIcon },
  ];

  return (
    <Flex
      width="full"
      direction="column"
      pb="24px"
      px={{ base: '16px', md: 0 }}
    >
      <PageHeader>Asset Counts</PageHeader>

      <Stack
        width="full"
        spacing="16px"
        alignItems="center"
        direction={{ base: 'column', sm: 'row' }}
        mt={10}
      >
        <Text>Show Assets Count by: </Text>

        <Select
          title="Type"
          options={[]}
          selectedOption={undefined}
          containerStyles={{
            width: isMobile ? '100%' : '261px',
          }}
          selectStyles={{ height: '46px', pt: '0px' }}
          showTitleAfterSelect={false}
          handleSelect={() => {}}
        />
      </Stack>

      <Grid
        templateColumns="repeat(auto-fit, minmax(230px, 1fr))"
        gap="24px"
        my="2em"
      >
        {data.map((item, index) => (
          <AssetCountCard data={item} key={index} />
        ))}
      </Grid>
    </Flex>
  );
};

export default AssetCount;
