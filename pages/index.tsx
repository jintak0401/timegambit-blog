import { allBlogs } from 'contentlayer/generated';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import Link from 'next/link';

import { pick, sortedBlogPost } from '@/lib/contentlayer';

import phrases from '@/data/phrases';
import siteMetadata from '@/data/siteMetadata';

import Introduction from '@/components/Introduction';
import PostList from '@/components/PostList';
import { PageSEO } from '@/components/SEO';

const HOME_POST_LENGTH = 3;

export const getStaticProps: GetStaticProps = async () => {
  const posts = sortedBlogPost(allBlogs)
    .slice(0, HOME_POST_LENGTH)
    .map((post) =>
      pick(post, ['title', 'slug', 'date', 'tags', 'summary', 'images'])
    );
  return {
    props: { posts },
  };
};

export default function Home({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO title="Time Gambit" description={siteMetadata.description} />
      <main className="flex flex-1 flex-col">
        <Introduction />
        <div className="flex justify-between">
          <h2 className="header-text text-2xl font-semibold duration-500">
            {phrases.Main.recentPosts}
          </h2>
          <Link href="/blog">
            <a className="rounded-md p-2 text-center font-semibold text-primary-500 hover:bg-gray-100 dark:text-primary-600 dark:hover:bg-gray-800">
              {phrases.Main.allPosts}
            </a>
          </Link>
        </div>
        <PostList posts={posts} />
      </main>
    </>
  );
}
