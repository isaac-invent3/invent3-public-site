import { Flex } from '@chakra-ui/react';
import Button from '../Button';

interface ButtonPaginationProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}
const ButtonPagination = (props: ButtonPaginationProps) => {
  const { totalPages, currentPage, setCurrentPage } = props;

  return (
    <Flex justifyContent="space-between" width="full">
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
