"use client"
import useFormatUrl from '~/lib/hooks/useFormatUrl';
import useParseUrlData from '~/lib/hooks/useParseUrl';
import Layout from '~/lib/layout/ProtectedPage';

type RootLayoutProps = {
  children: React.ReactNode;
};


const ProtectedLayout = ({ children }: RootLayoutProps) => {
  const formattedUrl = useFormatUrl()

  const parsedUrl = useParseUrlData(formattedUrl);

  console.log({ parsedUrl });
  return <Layout>{children}</Layout>;
};

export default ProtectedLayout;
