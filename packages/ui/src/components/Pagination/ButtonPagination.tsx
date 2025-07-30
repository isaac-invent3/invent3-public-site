import { Flex } from '@chakra-ui/react';
import Button from '../Button';

interface ButtonPaginationProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  showIfHasMorePages?: boolean;
}
const ButtonPagination = (props: ButtonPaginationProps) => {
  const {
    totalPages,
    currentPage,
    setCurrentPage,
    showIfHasMorePages = false,
  } = props;

  return (
    <Flex
      justifyContent="space-between"
      width="full"
      display={showIfHasMorePages ? (totalPages > 1 ? 'flex' : 'none') : 'flex'}
    >
      <Button
        variant="secondary"
        handleClick={() => setCurrentPage((prev) => prev - 1)}
        isDisabled={currentPage === 1}
        customStyles={{ width: '100px' }}
      >
        Previous
      </Button>
      <Button
        variant="secondary"
        handleClick={() => setCurrentPage((prev) => prev + 1)}
        isDisabled={totalPages === 0 || currentPage === totalPages}
        customStyles={{ width: '100px' }}
      >
        Next
      </Button>
    </Flex>
  );
};

export default ButtonPagination;
