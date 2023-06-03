import phrases from 'data/phrases';
import siteMetadata from 'data/siteMetadata.mjs';

import { allBlogs, Blog } from 'contentlayer/generated';

import { pickBlogItem, sortedBlogPost } from '@/lib/contentlayer';

import PostList from '@/components/card-and-list/post-list';
import NavLink from '@/components/common/nav-link';

import { PopularPostType } from '@/types';
import { PostListItem } from '@/types';

import Introduction from './introduction';

const getPosts = async () => {
  const recentPosts = sortedBlogPost(allBlogs)
    .slice(0, siteMetadata.blogPost.homeRecentPostLength)
    .map(pickBlogItem);

  const res = await fetch(`${process.env.API_URL}/api/views`, {
    method: 'GET',
    next: {
      revalidate: siteMetadata.rebuildPeriod,
    },
  });

  let popularPosts: PostListItem[] = [];
  if (res.ok) {
    const popularPostsSlug: PopularPostType[] = await res.json();
    if (popularPostsSlug && popularPostsSlug.length > 0) {
      popularPosts = popularPostsSlug.map(({ slug }) => {
        const post = allBlogs.find((item) => item.slug === slug) as Blog;
        return pickBlogItem(post);
      });
    }
  }

  return {
    recentPosts,
    popularPosts,
  };
};

const HomePage = async () => {
  const { recentPosts, popularPosts } = await getPosts();

  return (
    <div className="flex flex-1 flex-col">
      <Introduction />
      <div className="mb-2 flex justify-between xl:mt-2">
        <h1 className="strong-text text-2xl font-semibold xl:text-3xl">
          {phrases.Main.blogPosts}
        </h1>
        <NavLink
          href="/blog"
          className="rounded-md p-2 text-center font-semibold text-primary-500 hover:bg-gray-100 dark:text-primary-400 dark:hover:bg-gray-800 xl:text-lg"
        >
          {phrases.Main.allPosts}
        </NavLink>
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
  );
};

export default HomePage;
