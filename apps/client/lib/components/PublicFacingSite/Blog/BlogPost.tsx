'use client';
import React from 'react';
import { Avatar, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import HeroHeader from '../Common/HeroHeader';
import { KeyTextField, RichTextField } from '@prismicio/client';
import { PrismicRichText } from '@prismicio/react';
import components from '~/lib/components/UI/prismic-serializer';
import {
  BlogPostDocument,
  BlogPostDocumentDataTagsItem,
  Simplify,
} from '~/prismicio-types';
import BlogCard from './BlogCard';
import CTA from './CTA';

interface IBlogPosts {
  title: KeyTextField;
  content: RichTextField;
  author: KeyTextField;
  authorImage: string | null | undefined;
  previewImage: string | null | undefined;
  relatedPosts: BlogPostDocument<string>[];
}

const BlogPost = (props: IBlogPosts) => {
  const { title, content, author, authorImage, previewImage, relatedPosts } =
    props;
  return (
    <Flex direction="column">
      <HeroHeader
        subtitle={''}
        customHeading={{ maxW: '823px' }}
        containerStyle={{
          spacing: { base: '16px', lg: '24px' },
          minH: '100px',
        }}
        contentContainerStyle={{ py: { base: '69px', lg: '46px' } }}
        subTitleStyle={{
          maxW: { lg: '705px' },
          textOverflow: 'clip',
          noOfLines: 2,
        }}
        bgDesktop={previewImage ?? ''}
        bgMobile={previewImage ?? ''}
      >
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          justifyContent="space-between"
        >
          <Text
            width={{ base: 'full', lg: '60%' }}
            fontWeight={800}
            fontSize={{ base: '24px', lg: '40px' }}
            lineHeight="100%"
            color="white"
          >
            {title}
          </Text>

          <HStack spacing="16px">
            <Avatar
              src={authorImage ?? ''}
              name={author ?? ''}
              width="73px"
              height="73px"
            />
            <VStack alignItems="flex-start" spacing="8px">
              <Text size="md" color="white">
                Written By
              </Text>
              <Text color="white" size="xl">
                {author}
              </Text>
            </VStack>
          </HStack>
        </Flex>
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
          {relatedPosts.length > 0 && (
            <VStack
              width="full"
              borderTop="1px solid #BBBBBB"
              textAlign="center"
              alignItems="flex-start"
              pt="60px"
              spacing="48px"
            >
              <Text
                fontWeight={800}
                fontSize={{ base: '24px', lg: '40px' }}
                lineHeight="100%"
              >
                Related Blog
              </Text>
              <HStack width="full" overflow="scroll">
                {relatedPosts.map((item, index) => (
                  <BlogCard
                    id={item.uid}
                    title={item.data.title}
                    previewImage={item.data.preview_image.url}
                    authorImage={item.data.author_image.url}
                    authorName={item.data.author}
                    dateCreated={item.first_publication_date}
                    tags={item.data.tags.map(
                      (item: Simplify<BlogPostDocumentDataTagsItem>) =>
                        item.tag_name
                    )}
                    key={index}
                    containerStyle={{
                      bgColor: 'transparent',
                      width: '299px',
                      p: 0,
                    }}
                  />
                ))}
              </HStack>
            </VStack>
          )}
          <CTA />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default BlogPost;
