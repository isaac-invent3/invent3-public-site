import * as prismic from '@prismicio/client';
import { createClient } from '~/prismicio';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogPost from '~/lib/components/PublicFacingSite/Blog/BlogPost';

// Ensure params type matches Next.js expectations
type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const slug = (await params).slug;
  const client = createClient();
  const page = await client.getByUID('blog_post', slug).catch(() => notFound());

  return {
    title: `Blog - ${page.data.title}`,
    description: page.data.meta_description,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    openGraph: {
      images: [
        {
          url: page.data.preview_image.url ?? '',
          alt: page.data.preview_image.alt ?? 'Blog Image',
          width: 328,
          height: 400,
        },
      ],
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const slug = (await params).slug;
  const client = createClient();
  const page = await client.getByUID('blog_post', slug).catch(() => notFound());

  const { title, content, author, author_image, preview_image } = page.data;

  const relatedPosts = await client.getAllByType('blog_post', {
    limit: 2,
    orderings: [
      { field: 'my.blog_post.publication_date', direction: 'desc' },
      { field: 'document.first_publication_date', direction: 'desc' },
    ],
    predicates: [
      prismic.filter.not('my.blog_post.uid', slug),
      prismic.filter.any('document.tags', page.tags),
    ],
  });

  return (
    <BlogPost
      title={title}
      content={content}
      author={author}
      authorImage={author_image.url}
      previewImage={preview_image.url}
      relatedPosts={relatedPosts}
    />
  );
}

export const fetchCache = 'force-no-store';
