import {
  Avatar,
  Flex,
  Heading,
  HStack,
  StackProps,
  Text,
  VStack,
} from '@chakra-ui/react';
import { KeyTextField } from '@prismicio/client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { dateFormatter } from '~/lib/utils/Formatters';

interface BlogCardProps {
  id: string;
  title: KeyTextField;
  authorImage: string | null | undefined;
  authorName: KeyTextField;
  dateCreated: string;
  previewImage: string | null | undefined;
  tags?: KeyTextField[];
  containerStyle?: StackProps;
}
const BlogCard = (props: BlogCardProps) => {
  const {
    id,
    title,
    authorImage,
    authorName,
    dateCreated,
    previewImage,
    tags,
    containerStyle,
  } = props;
  return (
    <Link href={`/blog/${id}`} style={{ minWidth: '100%' }}>
      <VStack
        width="full"
        spacing="24px"
        p="16px"
        bgColor="white"
        rounded="8px"
        height="full"
        justifyContent="space-between"
        {...containerStyle}
      >
        <VStack width="full" alignItems="flex-start" spacing="16px">
          <Flex position="relative" height="275px" width="full">
            <Image
              src={previewImage ?? ''}
              fill
              alt={`${title}'s preview image`}
            />
          </Flex>
          <HStack flexWrap="wrap" spacing="8px">
            {tags?.map((item, index) => (
              <Text
                px="16px"
                py="10px"
                color="primary.500"
                bgColor="#0E26421A"
                rounded="full"
                key={index}
              >
                {item}
              </Text>
            ))}
          </HStack>
          <Heading
            fontWeight={800}
            fontSize="16px"
            lineHeight="24px"
            color="black"
            textAlign="left"
          >
            {title}
          </Heading>
        </VStack>
        <HStack width="full" justifyContent="space-between">
          <HStack spacing="8px">
            <Avatar
              width="40px"
              height="40px"
              src={authorImage ?? ''}
              name={authorName ?? ''}
            />
            <Text
              fontSize="14px"
              lineHeight="20px"
              letterSpacing="0.04em"
              color="neutral.300"
            >
              {authorName}
            </Text>
          </HStack>
          <Text
            fontSize="14px"
            lineHeight="20px"
            letterSpacing="0.04em"
            color="neutral.300"
          >
            {dateFormatter(dateCreated, 'DD MMM, YYYY')}
          </Text>
        </HStack>
      </VStack>
    </Link>
  );
};

export default BlogCard;
