import { HStack, Icon, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from '~/lib/components/CustomIcons';

interface IPageNumber {
  isCurrent: boolean;
  value: number;
  onClick: () => void;
}
const PageNumber = ({ isCurrent, value, onClick }: IPageNumber) => {
  return (
    <Text
      color={isCurrent ? 'black' : 'neutral.600'}
      fontWeight={isCurrent ? 800 : 500}
      cursor="pointer"
      onClick={onClick}
    >
      {value}
    </Text>
  );
};

interface INumberPagination {
  currentPage: number;
  totalPage: number;
  onPageChange: React.Dispatch<React.SetStateAction<number>> | undefined;
}
const NumberPagination = ({
  currentPage,
  totalPage,
  onPageChange,
}: INumberPagination) => {
  const [hasEnded, setEnded] = useState(false);

  useEffect(() => {
    // Set `hasEnded` if we are close to the end
    if (currentPage + 3 >= totalPage) {
      setEnded(true);
    } else if (currentPage <= 3) {
      setEnded(false);
    }
  }, [currentPage, totalPage]);

  // Render pages before the ellipsis
  const renderBeforeEnd = () => {
    const pages = [];
    const ellipsis = (
      <Text key="ellipsis-before" color="neutral.600">
        ...
      </Text>
    );

    if (currentPage <= 3) {
      // Show first three pages
      for (let i = 1; i <= Math.min(3, totalPage); i++) {
        pages.push(
          <PageNumber
            key={i}
            isCurrent={i === currentPage}
            value={i}
            onClick={() => onPageChange && onPageChange(i)}
          />
        );
      }
    } else {
      // Show two pages before and including the current page
      for (let i = currentPage - 1; i <= currentPage && i <= totalPage; i++) {
        pages.push(
          <PageNumber
            key={i}
            isCurrent={i === currentPage}
            value={i}
            onClick={() => onPageChange && onPageChange(i)}
          />
        );
      }
    }

    if (totalPage > 4 && currentPage < totalPage - 2) {
      // Add ellipsis and the last two pages
      pages.push(ellipsis);
      for (let i = totalPage - 1; i <= totalPage; i++) {
        pages.push(
          <PageNumber
            key={i}
            isCurrent={i === currentPage}
            value={i}
            onClick={() => onPageChange && onPageChange(i)}
          />
        );
      }
    }

    return pages;
  };

  // Render pages when it has reached the end
  const renderOnEnd = () => {
    const pages = [];
    const ellipsis = (
      <Text key="ellipsis-after" color="neutral.600">
        ...
      </Text>
    );

    // Show first page, ellipsis, and last two pages
    if (totalPage > 4) {
      pages.push(
        <PageNumber
          key={1}
          isCurrent={false}
          value={1}
          onClick={() => onPageChange && onPageChange(1)}
        />
      );
      pages.push(ellipsis);
    }

    for (let i = totalPage - 2; i <= totalPage; i++) {
      pages.push(
        <PageNumber
          key={i}
          isCurrent={i === currentPage}
          value={i}
          onClick={() => onPageChange && onPageChange(i)}
        />
      );
    }

    return pages;
  };

  return (
    <HStack
      justifyContent="space-between"
      spacing="16px"
      alignContent="flex-start"
    >
      <Icon
        as={ChevronLeftIcon}
        boxSize="10px"
        cursor="pointer"
        mb="3px"
        onClick={() =>
          onPageChange && currentPage > 1 && onPageChange(currentPage - 1)
        }
      />

      {!hasEnded && <HStack spacing="16px">{renderBeforeEnd()}</HStack>}
      {hasEnded && <HStack spacing="16px">{renderOnEnd()}</HStack>}

      <Icon
        as={ChevronRightIcon}
        boxSize="10px"
        cursor="pointer"
        onClick={() =>
          onPageChange &&
          currentPage < totalPage &&
          onPageChange(currentPage + 1)
        }
      />
    </HStack>
  );
};

export default NumberPagination;
