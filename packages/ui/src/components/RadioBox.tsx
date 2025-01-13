import { Box, Flex, FlexProps } from '@chakra-ui/react';

interface RadioBoxProps extends FlexProps {
  handleClick: () => void;
  isSelected: boolean;
  boxStyle?: FlexProps;
}
const RadioBox = (props: RadioBoxProps) => {
  const { handleClick, isSelected, boxStyle, ...rest } = props;
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
      {...rest}
    >
      {isSelected && (
        <Box
          width="8px"
          height="8px"
          rounded="full"
          bgColor="primary.500"
          {...boxStyle}
        />
      )}
    </Flex>
  );
};

export default RadioBox;
