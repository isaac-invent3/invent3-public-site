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
    // Update hasEnded based on the current page position
    setEnded(currentPage >= totalPage - 2);
  }, [currentPage, totalPage]);

  // Helper function to handle page change safely
  const handlePageChange = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
    }
  };

  // Render pages for when the current page is not near the end
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
            onClick={() => handlePageChange(i)}
          />
        );
      }
    } else {
      // Show two pages before and including the current page
      for (
        let i = Math.max(1, currentPage - 1);
        i <= currentPage && i <= totalPage;
        i++
      ) {
        pages.push(
          <PageNumber
            key={i}
            isCurrent={i === currentPage}
            value={i}
            onClick={() => handlePageChange(i)}
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
            onClick={() => handlePageChange(i)}
          />
        );
      }
    }

    return pages;
  };

  // Render pages for when the current page is near the end
  const renderOnEnd = () => {
    const pages = [];
    const ellipsis = (
      <Text key="ellipsis-after" color="neutral.600">
        ...
      </Text>
    );

    if (totalPage > 4) {
      pages.push(
        <PageNumber
          key={1}
          isCurrent={1 === currentPage}
          value={1}
          onClick={() => handlePageChange(1)}
        />
      );
      pages.push(ellipsis);
    }

    for (let i = Math.max(1, totalPage - 2); i <= totalPage; i++) {
      pages.push(
        <PageNumber
          key={i}
          isCurrent={i === currentPage}
          value={i}
          onClick={() => handlePageChange(i)}
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
        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
      />

      {!hasEnded && <HStack spacing="16px">{renderBeforeEnd()}</HStack>}
      {hasEnded && <HStack spacing="16px">{renderOnEnd()}</HStack>}

      <Icon
        as={ChevronRightIcon}
        boxSize="10px"
        cursor="pointer"
        onClick={() =>
          currentPage < totalPage && handlePageChange(currentPage + 1)
        }
      />
    </HStack>
  );
};

export default NumberPagination;
