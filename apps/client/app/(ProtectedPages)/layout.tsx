import Layout from '~/lib/layout/ProtectedPage';

type RootLayoutProps = {
  children: React.ReactNode;
};

const ProtectedLayout = ({ children }: RootLayoutProps) => {
  return <Layout>{children}</Layout>;
};

export default ProtectedLayout;
