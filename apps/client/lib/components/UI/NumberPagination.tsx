/* eslint-disable no-lone-blocks */
/* eslint-disable no-plusplus */
import { HStack, Icon, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { ChevronLeftIcon, ChevronRightIcon } from '../CustomIcons';

interface IPageNumber {
  isCurrent: boolean;
  value: number;
}
const PageNumber = (props: IPageNumber) => {
  const { isCurrent, value } = props;
  return (
    <Text
      color={isCurrent ? 'black' : 'neutral.600'}
      lineHeight="14.26px"
      fontSize="12px"
      key={value}
      fontWeight={isCurrent ? 800 : 500}
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
  const pagesToShow = totalPage <= 3 ? 3 : 2;
  const [hasEnded, setEnded] = useState(false);

  useEffect(() => {
    if (currentPage + pagesToShow > totalPage) {
      setEnded(true);
    }
    if (currentPage - 1 === 1 || currentPage === 1) {
      setEnded(false);
    }
  }, [currentPage, totalPage, pagesToShow]);

  // Only Rendered when it has not gotten to the end initially
  const renderBeforeEnd = () => {
    const pages = [];
    const ellipsis = (
      <Text
        key="ellipsis"
        fontSize="12px"
        lineHeight="14.26px"
        color="neutral.600"
      >
        ...
      </Text>
    );

    if (currentPage <= pagesToShow) {
      for (let i = 1; i <= pagesToShow && i <= totalPage; i++) {
        pages.push(<PageNumber isCurrent={i === currentPage} value={i} />);
      }
    } else {
      for (let i = currentPage - 1; i <= currentPage && i <= totalPage; i++) {
        pages.push(<PageNumber isCurrent={i === currentPage} value={i} />);
      }
    }
    {
      if (totalPage > 3) {
        pages.push(ellipsis);

        pages.push(<PageNumber isCurrent={false} value={totalPage} />);
      }
    }

    return pages;
  };

  // Only Rendered when it has gotten to the end
  const renderOnEnd = () => {
    const pages = [];
    const ellipsis = (
      <Text
        key="ellipsis"
        fontSize="12px"
        lineHeight="14.26px"
        color="neutral.600"
      >
        ...
      </Text>
    );
    if (totalPage > 3) {
      pages.push(<PageNumber isCurrent={false} value={1} />);
      pages.push(ellipsis);
    } else {
      pages.push(<PageNumber isCurrent={false} value={1} />);
    }

    if (currentPage + 1 >= totalPage) {
      for (let i = totalPage - 1; i <= totalPage; i++) {
        pages.push(<PageNumber isCurrent={i === currentPage} value={i} />);
      }
    } else {
      for (let i = currentPage; i <= currentPage + 1 && i <= totalPage; i++) {
        pages.push(<PageNumber isCurrent={i === currentPage} value={i} />);
      }
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
        onClick={() => onPageChange && onPageChange(currentPage - 1)}
      />

      {!hasEnded && <HStack spacing="16px">{renderBeforeEnd()}</HStack>}
      {hasEnded && <HStack spacing="16px">{renderOnEnd()}</HStack>}

      <Icon
        as={ChevronRightIcon}
        boxSize="10px"
        cursor="pointer"
        onClick={() => onPageChange && onPageChange(currentPage + 1)}
      />
    </HStack>
  );
};

export default NumberPagination;
