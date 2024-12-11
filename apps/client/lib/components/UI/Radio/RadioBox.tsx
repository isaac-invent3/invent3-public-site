import { Box, Flex } from '@chakra-ui/react';

interface RadioBoxProps {
  handleClick: () => void;
  isSelected: boolean;
}
const RadioBox = (props: RadioBoxProps) => {
  const { handleClick, isSelected } = props;
  return (
    <Flex
      width="18px"
      height="18px"
      flexShrink={0}
      bgColor="transparent"
      border="1px solid #BBBBBB"
      rounded="full"
      justifyContent="center"
      alignItems="center"
      cursor="pointer"
      onClick={() => handleClick()}
    >
      {isSelected && (
        <Box width="10px" height="10px" rounded="full" bgColor="primary.500" />
      )}
    </Flex>
  );
};

export default RadioBox;
