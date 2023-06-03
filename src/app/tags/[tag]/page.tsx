import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import phrases from 'data/phrases';
import siteMetadata from 'data/site-metadata.mjs';

import { allBlogs } from 'contentlayer/generated';
import { slug } from 'github-slugger';

import { pickBlogItem, sortedBlogPost } from '@/lib/contentlayer';
import { getAllTags } from '@/lib/get-blog-info.mjs';
import { generateDefaultMetadata } from '@/lib/metadata';

import ListLayout from '@/layouts/list-layout';

interface Props {
  params: {
    tag: string;
  };
}

export const generateStaticParams = async () => {
  const tags = await getAllTags();

  return Object.keys(tags).map((tag) => ({
    tag: slug(tag),
  }));
};

export const generateMetadata = ({ params }: Props): Metadata => {
  const tag = decodeURI(params.tag);
  const { openGraph, twitter, ...rest } = generateDefaultMetadata({
    title: `Tag - ${tag}`,
    description:
      phrases.Seo.specificTagDesc?.replace('%s', tag) ||
      `#${tag} tags - ${siteMetadata.author}`,
    url: `${siteMetadata.siteUrl}/tags/${tag}`,
  });

  return {
    openGraph,
    twitter,
    ...rest,
  };
};

const getPosts = (tagSlug: string) => {
  return sortedBlogPost(allBlogs)
    .filter(
      ({ tags, draft }) =>
        !draft && (tags ?? []).map((t) => slug(t)).includes(tagSlug)
    )
    .map(pickBlogItem);
};

const TagPostListPage = async ({ params }: Props) => {
  const tag = decodeURI(params.tag);
  const posts = getPosts(tag);

  if (posts.length === 0) {
    notFound();
  }

  return <ListLayout posts={posts} title={tag} />;
};

export default TagPostListPage;
