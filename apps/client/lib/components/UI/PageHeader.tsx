import { Heading, HeadingProps } from '@chakra-ui/react';

const PageHeader = ({
  children,
  ...rest
}: { children: string | React.ReactNode } & HeadingProps) => {
  return (
    <Heading
      as="h3"
      size={{ base: 'lg', lg: 'xl' }}
      color="primary.500"
      fontWeight={800}
      {...rest}
    >
      {children}
    </Heading>
  );
};

export default PageHeader;
