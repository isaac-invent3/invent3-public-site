'use client';
import React from 'react';
import { Avatar, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import HeroHeader from '../Common/HeroHeader';
import { KeyTextField, RichTextField } from '@prismicio/client';
import { PrismicRichText } from '@prismicio/react';
import components from '~/lib/components/UI/prismic-serializer';

interface IBlogPosts {
  title: KeyTextField;
  content: RichTextField;
  author: KeyTextField;
  authorImage: string | null | undefined;
  previewImage: string | null | undefined;
}

const BlogPost = (props: IBlogPosts) => {
  const { title, content, author, authorImage, previewImage } = props;
  return (
    <Flex direction="column">
      <HeroHeader
        title={title as unknown as string}
        subtitle={''}
        customHeading={{ maxW: '823px' }}
        containerStyle={{ spacing: { base: '16px', lg: '24px' } }}
        subTitleStyle={{
          maxW: { lg: '705px' },
          textOverflow: 'clip',
          noOfLines: 2,
        }}
        bgDesktop={previewImage ?? ''}
        bgMobile={previewImage ?? ''}
      >
        <Text
          fontSize="14px"
          lineHeight="20px"
          letterSpacing="0.04em"
          color="white"
        >
          By {author}
        </Text>
      </HeroHeader>
      <Flex justifyContent="center" width="full">
        <Flex
          width="full"
          justifyContent="space-between"
          alignItems="flex-start"
          px={{ base: '16px', md: '40px', '2xl': '80px' }}
          py={{ base: '80px' }}
          maxW="1440px"
          direction="column"
          gap={{ base: '32px', lg: '40px' }}
        >
          <PrismicRichText field={content} components={components} />
          {content.length === 0 && (
            <Flex width="full" justifyContent="center">
              <Text
                fontSize="16px"
                color="neutral.600"
                my="10vh"
                fontWeight={400}
              >
                No content exists at the moment
              </Text>
            </Flex>
          )}
          {content.length > 0 && (
            <HStack spacing="8px">
              <Avatar
                width="40px"
                height="40px"
                src={authorImage ?? ''}
                name={author ?? ''}
              />
              <VStack alignItems="flex-start" spacing="8px">
                <Text fontSize="14px" lineHeight="20px" letterSpacing="0.04em">
                  {author}
                </Text>
                <Text
                  fontSize="14px"
                  lineHeight="20px"
                  letterSpacing="0.04em"
                  color="neutral.300"
                >
                  Author
                </Text>
              </VStack>
            </HStack>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default BlogPost;
