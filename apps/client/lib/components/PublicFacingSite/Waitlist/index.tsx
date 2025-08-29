'use client';
import {
  Avatar,
  AvatarGroup,
  Divider,
  Flex,
  Heading,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import QuestionAnswerAccordion from '../FAQ/QuestionAnswerAccordion';
import Image from 'next/image';
import SectionInfo from '../Common/SectionInfo';
import WaitListForm from './WaitlistForm';
import Link from 'next/link';

const companies = ['/github.svg', '/asana.svg', '/gumroad.svg'];

const Waitlist = () => {
  return (
    <Flex
      width="full"
      direction="column"
      alignItems="center"
      mb={{ lg: '109px' }}
    >
      <Flex
        bgColor="white"
        width="full"
        py="16px"
        px={{ base: '16px', lg: '80px' }}
      >
        <Link href="/">
          <Flex position="relative" width="110.87px" height="36.81px">
            <Image src="/logo-blue.svg" fill alt="invent3 logo" />
          </Flex>
        </Link>
      </Flex>
      <Flex
        width="full"
        direction="column"
        justifyContent="center"
        background="linear-gradient(180deg, #FFFFFF 0%, #D9D9D9 76.61%, #FFFFFF 101.43%)"
        pt={{ base: '54px', lg: '76px' }}
        pb={{ base: '48px', lg: '165px' }}
        px="16px"
      >
        <VStack width="full" alignItems="center">
          <Flex
            width={{ base: '53px', lg: '80px' }}
            height={{ base: '53px', lg: '80px' }}
            position="relative"
            mb={{ base: '16px', lg: '24px' }}
          >
            <Image src="/invent3-dark-box-logo.png" fill alt="logo-box" />
          </Flex>

          <VStack spacing="8px" mb={{ base: '24px', lg: '40px' }}>
            <Heading
              fontWeight={800}
              fontSize={{ base: '24px', lg: '40px' }}
              lineHeight={{ base: '32px', lg: '130%' }}
              color="black"
              textAlign="center"
            >
              Get Early Access, <br /> Join The{' '}
              <Heading
                color="secondary.purple.500"
                fontWeight={800}
                fontSize={{ base: '24px', lg: '40px' }}
                lineHeight={{ base: '32px', lg: '130%' }}
                as="span"
              >
                Waitlist
              </Heading>{' '}
              Today
            </Heading>
            <Text
              color="#1D1D1D"
              fontWeight={400}
              fontSize={{ base: '14px', lg: '16px' }}
              lineHeight={{ base: '20px', lg: '24px' }}
              textAlign="center"
              maxW={{ base: '343px', lg: '521px' }}
            >
              We’re getting close. Sign up to get early access to Invent3 and
              start your Asset Management Journey
            </Text>
          </VStack>
          <WaitListForm />
          <Stack
            direction={{ base: 'column', lg: 'row' }}
            spacing="16px"
            alignItems="center"
            mt={{ base: '16px', lg: '32px' }}
          >
            <AvatarGroup size={{ base: 'md', lg: 'sm' }} max={3}>
              <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
              <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
              <Avatar
                name="Prosper Otemuyiwa"
                src="https://bit.ly/prosper-baba"
              />
            </AvatarGroup>
            <Text
              fontSize="14px"
              lineHeight={{ base: '16px', lg: '20px' }}
              color="neutral.700"
            >
              Join over 1000+ companies on the waitlist
            </Text>
          </Stack>
        </VStack>
      </Flex>
      <VStack
        spacing={{ base: '16px', lg: '32px' }}
        mb={{ base: '40px', lg: '116px' }}
        px="16px"
      >
        <Flex alignItems="center" gap="32px" width="full">
          <Divider
            height="1px"
            border="none"
            bgGradient="linear(to-l, #0B0B0B 0%, rgba(113,113,113,0.3) 38.46%)"
            minW="60px"
            width={{ lg: '287px' }}
            flexGrow={1}
          />
          <Text
            fontSize={{ base: '14px', lg: '24px' }}
            lineHeight={{ base: '20px', lg: '32px' }}
            fontWeight={700}
            color="#1D1D1D"
            whiteSpace="nowrap"
          >
            TRUSTED BY COMPANIES LIKE
          </Text>
          <Divider
            height="1px"
            border="none"
            bgGradient="linear(to-r, #0B0B0B 0%, rgba(113,113,113,0.3) 38.46%)"
            width={{ lg: '287px' }}
            minW="60px"
            flexGrow={1}
          />
        </Flex>
        {companies && (
          <Flex
            width="full"
            justifyContent="center"
            alignItems="center"
            gap={{ base: '24px', lg: '80px' }}
          >
            {companies.map((company, index) => (
              <Flex
                key={index}
                width={{ base: '89px', lg: '170px' }}
                height={{ base: '25px', lg: '55px' }}
                position="relative"
              >
                <Image
                  src={company}
                  fill
                  alt={`company-logo-${index}`}
                  style={{ objectFit: 'contain' }}
                />
              </Flex>
            ))}
          </Flex>
        )}
      </VStack>
      <VStack
        maxW="737px"
        width="full"
        alignItems="center"
        spacing={{ base: '32px', lg: '65px' }}
        px="16px"
      >
        <SectionInfo
          heading={['Frequently Asked', ['Questions']]}
          containerStyles={{
            spacing: '32px',
            width: 'max-content',
          }}
          headingPrimaryColor="primary.500"
        />
        <QuestionAnswerAccordion customAccordionStyles={{ width: 'full' }} />
      </VStack>
    </Flex>
  );
};

export default Waitlist;
