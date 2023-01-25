import { allProjects, Project } from 'contentlayer/generated';
import siteMetadata from 'data/siteMetadata.mjs';
import { InferGetStaticPropsType } from 'next';

import { PostSEO } from '@/components/common/SEO';
import { MDXLayoutRenderer } from '@/components/mdxComponents/MDXComponents';

const DEFAULT_LAYOUT = 'PostLayout';

export async function getStaticPaths() {
  return {
    paths: allProjects.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  };
}

export const getStaticProps = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const slug = params.slug;
  const post = allProjects.find((p) => p.slug === slug) as Project;
  post.body.raw = '';

  return {
    props: {
      post,
    },
  };
};

export default function ProjectPost({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PostSEO url={`${siteMetadata.siteUrl}/project/${post.slug}`} {...post} />
      <MDXLayoutRenderer
        layout={post['layout'] || DEFAULT_LAYOUT}
        content={post}
      />
    </>
  );
}
