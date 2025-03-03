'use client';
import Layout from '~/lib/layout/PublicPage';

type RootLayoutProps = {
  children: React.ReactNode;
};

const PublicPageLayout = ({ children }: RootLayoutProps) => {
  return <Layout>{children}</Layout>;
};

export default PublicPageLayout;
