'use client';
import React, { useEffect, useState } from 'react';
import { Flex, SimpleGrid, Skeleton, Text, VStack } from '@chakra-ui/react';
import HeroHeader from '../Common/HeroHeader';
import BlogCard from './BlogCard';
import { TablePagination } from '@repo/ui/components';
import SearchComponent from '../Common/SearchComponent';
import { usePrismicDocumentsByType } from '@prismicio/react';
import {
  BlogPostDocument,
  Simplify,
  BlogPostDocumentDataTagsItem,
} from '../../../../prismicio-types';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import * as prismic from '@prismicio/client';

const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [blogs, setBlogs] = useState<BlogPostDocument[]>([]);

  const [response] = usePrismicDocumentsByType<BlogPostDocument>('blog_post', {
    predicates: [prismic.predicate.fulltext('my.blog_post.title', search)],
    pageSize: pageSize,
    page: currentPage,
  });

  useEffect(() => {
    if (response) {
      setIsLoading(false);
      setIsFetching(false);
      setBlogs(response.results);
    }
  }, [response]);

  useEffect(() => {
    setIsFetching(true);
  }, [currentPage, search]);

  return (
    <Flex direction="column">
      <HeroHeader
        title="Invent3 Blog"
        subtitle="Explore expert tips, industry updates, and best practices on asset management, maintenance, cost optimization, and compliance strategies."
        customHeading={{ maxW: '610px' }}
        containerStyle={{ spacing: { base: '16px', lg: '24px' } }}
        subTitleStyle={{ maxW: { lg: '610px' } }}
        bgDesktop="/blog-hero-desktop.png"
        bgMobile="/blog-hero-mobile.png"
      >
        <Flex width="full" maxW={{ lg: '610px' }}>
          <SearchComponent setSearch={setSearch} />
        </Flex>
      </HeroHeader>
      <Flex justifyContent="center" width="full">
        <Flex
          width="full"
          justifyContent="space-between"
          alignItems="flex-start"
          px={{ base: '16px', md: '40px', '2xl': '80px' }}
          py={{ base: '80px', lg: '120px' }}
          maxW="1440px"
          direction="column"
          gap={{ base: '32px', lg: '24px' }}
        >
          <VStack
            opacity={isFetching ? 0.6 : 1}
            spacing={{ base: '20px', lg: '44px' }}
            width="full"
            bgColor="#F2F1F180"
            p="16px"
            rounded="8px"
          >
            {isLoading ? (
              <SimpleGrid
                gap={{ base: '20px', lg: '24px' }}
                width="full"
                columns={{ base: 1, md: 2, lg: 3 }}
              >
                {Array(8)
                  .fill('')
                  .map((_, index) => (
                    <Skeleton
                      height="400px"
                      width="full"
                      rounded="20px"
                      key={index}
                    />
                  ))}
              </SimpleGrid>
            ) : blogs.length > 0 ? (
              <SimpleGrid
                gap={{ base: '20px', lg: '24px' }}
                width="full"
                columns={{ base: 1, md: 2, lg: 3 }}
                height="full"
              >
                {blogs.map((item, index) => (
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
                  />
                ))}
              </SimpleGrid>
            ) : (
              <Text
                fontSize="16px"
                color="neutral.600"
                my="10vh"
                fontWeight={400}
              >
                No Blog exists at the moment
              </Text>
            )}
            {response && (
              <Flex width="full" justifyContent="flex-end">
                <TablePagination
                  totalPage={response?.total_pages}
                  pageNumber={currentPage}
                  setPageNumber={setCurrentPage}
                  pageSize={pageSize}
                  setPageSize={setPageSize}
                />
              </Flex>
            )}
          </VStack>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Blog;
