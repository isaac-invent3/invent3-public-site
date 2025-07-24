import { Text as ChakraText, Skeleton, TextProps } from '@chakra-ui/react';

interface BadgeProps extends TextProps {
  badgeContent?: string | number;
  badgeColor: string;
  isLoading?: boolean;
}
const CustomBadge = (props: BadgeProps) => {
  const { badgeContent, badgeColor, isLoading } = props;
  return (
    <Skeleton isLoaded={!isLoading}>
      <ChakraText
        color={badgeColor}
        py="4px"
        px="12px"
        rounded="full"
        bgColor={`${badgeColor}1A`}
        fontWeight={700}
      >
        {badgeContent !== undefined && badgeContent !== null
          ? typeof badgeContent === 'number'
            ? badgeContent?.toLocaleString()
            : badgeContent
          : '-'}
      </ChakraText>
    </Skeleton>
  );
};

export default CustomBadge;
