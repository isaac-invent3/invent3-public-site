import { Flex } from '@chakra-ui/react';
import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface PublicPageLayoutProps {
  children: React.ReactNode;
}
const PublicPageLayout = ({ children }: PublicPageLayoutProps) => {
  return (
    <Flex width="full" direction="column">
      <Header />
      {children}
      <Footer />
    </Flex>
  );
};

export default PublicPageLayout;
