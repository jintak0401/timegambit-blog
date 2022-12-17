import { allBlogs } from 'contentlayer/generated';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import Link from 'next/link';

import { pickBlogItem, sortedBlogPost } from '@/lib/contentlayer';

import phrases from '@/data/phrases';
import siteMetadata from '@/data/siteMetadata';

import PostList from '@/components/card-and-list/PostList';
import { PageSEO } from '@/components/common/SEO';
import Introduction from '@/components/Introduction';

export const getStaticProps: GetStaticProps = async () => {
  const posts = sortedBlogPost(allBlogs)
    .slice(0, siteMetadata.blogPost.homePostLength)
    .map(pickBlogItem);
  return {
    props: { posts },
  };
};

export default function Home({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO
        title={siteMetadata.title}
        description={phrases.Seo.homeDesc || siteMetadata.description}
      />
      <main className="flex flex-1 flex-col">
        <Introduction />
        <div className="mb-2 flex justify-between">
          <h2 className="basic-text text-2xl font-semibold">
            {phrases.Main.recentPosts}
          </h2>
          <Link
            href="/blog"
            className="rounded-md p-2 text-center font-semibold text-primary-500 hover:bg-gray-100 dark:text-primary-600 dark:hover:bg-gray-800"
          >
            {phrases.Main.allPosts}
          </Link>
        </div>
        <PostList posts={posts} />
      </main>
    </>
  );
}
