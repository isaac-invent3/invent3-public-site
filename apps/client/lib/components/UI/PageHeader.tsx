import { Heading, HeadingProps } from '@chakra-ui/react';

const PageHeader = ({
  children,
  ...rest
}: { children: string | React.ReactNode } & HeadingProps) => {
  return (
    <Heading
      as="h3"
      fontWeight={800}
      fontSize="32px"
      lineHeight="38.02px"
      color="primary.500"
      {...rest}
    >
      {children}
    </Heading>
  );
};

export default PageHeader;
