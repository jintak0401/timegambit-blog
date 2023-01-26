import { allBlogs } from 'contentlayer/generated';
import phrases from 'data/phrases';
import siteMetadata from 'data/siteMetadata.mjs';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import Link from 'next/link';

import { pickBlogItem, sortedBlogPost } from '@/lib/contentlayer';
import { db } from '@/lib/db';
import { PopularPostType } from '@/lib/types';

import PostList from '@/components/card-and-list/PostList';
import Introduction from '@/components/common/Introduction';
import { PageSEO } from '@/components/common/SEO';

import queries from '@/pages/api/queries';

export const getStaticProps: GetStaticProps = async () => {
  const recentPosts = sortedBlogPost(allBlogs)
    .slice(0, siteMetadata.blogPost.homeRecentPostLength)
    .map(pickBlogItem);

  let connection = null;
  let popularPostsSlug: PopularPostType[] = [];
  try {
    connection = await db.getConnection();
    [popularPostsSlug] = await connection.query<PopularPostType[]>(
      queries.READ_POPULAR_POSTS,
      [siteMetadata.blogPost.homePopularPostLength]
    );
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  } finally {
    connection && connection.release();
  }

  let popularPosts;
  if (popularPostsSlug && popularPostsSlug.length > 0) {
    const slug2Order: { [key: string]: number } = {};
    popularPostsSlug.forEach((post, index) => {
      slug2Order[post.slug] = index;
    });
    popularPosts = allBlogs
      .filter((post) => post.slug in slug2Order)
      .sort((a, b) => slug2Order[a.slug] - slug2Order[b.slug]);
  }

  return {
    props: { recentPosts, popularPosts },
  };
};

export default function Home({
  recentPosts,
  popularPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO
        title={siteMetadata.title}
        description={phrases.Seo.homeDesc || siteMetadata.description}
      />
      <div className="flex flex-1 flex-col">
        <Introduction />
        <div className="mb-2 flex justify-between xl:mt-2">
          <h1 className="strong-text text-2xl font-semibold xl:text-3xl">
            {phrases.Main.blogPosts}
          </h1>
          <Link
            href="/blog"
            className="rounded-md p-2 text-center font-semibold text-primary-500 hover:bg-gray-100 dark:text-primary-400 dark:hover:bg-gray-800 xl:text-lg"
          >
            {phrases.Main.allPosts}
          </Link>
        </div>
        <h2 className="strong-text mt-2 text-xl font-semibold xl:mt-4 xl:text-2xl">
          {phrases.Main.recentPosts}
        </h2>
        <PostList posts={recentPosts} />
        {popularPosts && (
          <>
            <hr />
            <h2 className="strong-text mt-4 text-xl font-semibold xl:text-2xl">
              {phrases.Main.popularPosts}
            </h2>
            <PostList posts={popularPosts} />
          </>
        )}
      </div>
    </>
  );
}
