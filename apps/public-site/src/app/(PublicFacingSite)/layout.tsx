'use client';
import { PrismicProvider } from '@prismicio/react';
import Layout from '@/lib/layout';
import * as prismic from '@prismicio/client';
import { repositoryName } from '../../../prismicio';
import Link from 'next/link';

const client = prismic.createClient(repositoryName);

type RootLayoutProps = {
  children: React.ReactNode;
};

const PublicPageLayout = ({ children }: RootLayoutProps) => {
  return (
    <PrismicProvider
      internalLinkComponent={(props) => <Link {...props} />}
      client={client}
    >
      <Layout>{children}</Layout>
    </PrismicProvider>
  );
};

export default PublicPageLayout;
