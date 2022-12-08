import { allBlogs, Blog } from 'contentlayer/generated';
import { InferGetStaticPropsType } from 'next';

import { coreContent, sortedBlogPost } from '@/lib/contentlayer';

import siteMetadata from '@/data/siteMetadata';

import PageTitle from '@/components/blog/PageTitle';
import { BlogSEO } from '@/components/common/SEO';
import { MDXLayoutRenderer } from '@/components/mdxComponents/MDXComponents';

const DEFAULT_LAYOUT = 'PostLayout';

export async function getStaticPaths() {
  return {
    paths: allBlogs.map((p) => ({ params: { slug: p.slug.split('/') } })),
    fallback: false,
  };
}

export const getStaticProps = async ({
  params,
}: {
  params: { slug: string[] };
}) => {
  const slug = params.slug.join('/');
  const post: Blog = allBlogs.find((p) => p.slug === slug) as Blog;
  post.body.raw = '';

  // If post is included in category, sortedPosts are category posts
  const sortedPosts = sortedBlogPost(
    post?.series
      ? allBlogs.filter((p) => p.series === post.series)
      : allBlogs.filter((p) => !p.series),
    true
  );
  const series = post.series
    ? sortedPosts
        .filter((p) => !p.draft)
        .map((p) => ({ title: p.title, slug: p.slug }))
    : null;

  const seriesTitle = post.series ?? null;

  // prev and next will be a post which draft === false
  const postIndex = sortedPosts.findIndex((p) => p.slug === slug);
  let prevIndex = postIndex - 1,
    nextIndex = postIndex + 1,
    prev = null,
    next = null;
  for (; prevIndex >= 0; prevIndex--) {
    const { draft, title, slug } = coreContent(sortedPosts[prevIndex]);
    if (!draft) {
      prev = { title, slug };
      break;
    }
  }
  for (; nextIndex < sortedPosts.length; nextIndex++) {
    const { draft, title, slug } = coreContent(sortedPosts[nextIndex]);
    if (!draft) {
      next = { title, slug };
      break;
    }
  }

  return {
    props: {
      post,
      prev,
      next,
      series,
      seriesTitle,
    },
  };
};

export default function BlogPost({
  post,
  prev,
  next,
  series,
  seriesTitle,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      {'draft' in post && post['draft'] !== true ? (
        <>
          <BlogSEO
            url={`${siteMetadata.siteUrl}/blog/${post.slug}`}
            {...post}
          />
          <MDXLayoutRenderer
            layout={post['layout'] || DEFAULT_LAYOUT}
            content={post}
            prev={prev}
            next={next}
            seriesTitle={seriesTitle}
            series={series}
          />
        </>
      ) : (
        <div className="mt-24 text-center">
          <PageTitle>
            Under Construction{' '}
            <span role="img" aria-label="roadwork sign">
              🚧
            </span>
          </PageTitle>
        </div>
      )}
    </>
  );
}
