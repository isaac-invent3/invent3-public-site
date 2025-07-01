import { Flex, HStack, Icon, SimpleGrid, Text } from '@chakra-ui/react';
import React from 'react';
import ActionCard from './ActionCard';
import Link from 'next/link';
import { SlantedForwardIcon } from '~/lib/components/CustomIcons/PublicFacingSite';
import { SOCIAL_LINKS } from '~/lib/layout/PublicPage/Footer/data';

const ActionButton = ({ link, label }: { link: string; label: string }) => {
  return (
    <Link href={link}>
      <HStack>
        <Text
          color="primary.500"
          fontSize={{ base: '14px', lg: '16px' }}
          lineHeight={{ base: '20px', lg: '16px' }}
          letterSpacing="0.04em"
        >
          {label}
        </Text>
        <Icon as={SlantedForwardIcon} boxSize="24px" />
      </HStack>
    </Link>
  );
};

const Actions = () => {
  return (
    <Flex justifyContent="center" width="full">
      <Flex
        width="full"
        justifyContent="space-between"
        alignItems="flex-start"
        pt={{ base: '40px', lg: '49px' }}
        px={{ base: '16px', md: '40px', '2xl': '80px' }}
        maxW="1440px"
        position="relative"
        direction={{ base: 'column', lg: 'row' }}
        gap="24px"
      >
        <SimpleGrid width="full" columns={{ base: 1, md: 3 }} gap="24px">
          <ActionCard
            title="Email"
            subtitle="Reach out to us via email for quick assistance, inquiries, or support. Our team is ready to help with all your asset management needs."
          >
            <ActionButton label="Email Us" link="mailto:support@invent3.ai" />
          </ActionCard>
          <ActionCard
            title="Social Media"
            subtitle="Stay connected with us on social media for updates, industry insights, and customer support—engage with our community today!"
          >
            <HStack spacing="16px" flexWrap="wrap">
              {SOCIAL_LINKS.map((item, index) => (
                <Link href={item.link} key={index}>
                  <Flex
                    width="40px"
                    height="35px"
                    bgColor="primary.500"
                    rounded="4px"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Icon
                      as={item.icon}
                      boxSize="20px"
                      color="secondary.pale.500"
                    />
                  </Flex>
                </Link>
              ))}
            </HStack>
          </ActionCard>
          <ActionCard
            title="Live Chat"
            subtitle="Get instant support through our live chat. Our experts are available to provide real-time solutions and answer your questions efficiently."
          >
            <ActionButton label="Live Chat" link="mailto:support@invent3.ai" />
          </ActionCard>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
};

export default Actions;
