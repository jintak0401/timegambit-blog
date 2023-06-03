import { Metadata } from 'next';

import phrases from 'data/phrases';
import siteMetadata from 'data/siteMetadata.mjs';

import { allBlogs } from 'contentlayer/generated';
import { slug } from 'github-slugger';

import { pickBlogItem, sortedBlogPost } from '@/lib/contentlayer';
import { getAllTags } from '@/lib/get-blog-info.mjs';

import ListLayout from '@/layouts/list-layout';

interface Props {
  params: {
    tag: string;
  };
}

export const dynamicParams = false;
export const generateStaticParams = async () => {
  const tags = await getAllTags();

  return Object.keys(tags).map((tag) => ({
    tag: slug(tag),
  }));
};

export const generateMetadata = ({ params }: Props): Metadata => {
  const tag = decodeURI(params.tag);
  return {
    title: `Tag - ${tag}`,
    description:
      phrases.Seo.specificTagDesc?.replace('%s', tag) ||
      `#${tag} tags - ${siteMetadata.author}`,
    alternates: {
      canonical: `${siteMetadata.siteUrl}/tags/${params.tag}`,
    },
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
  return <ListLayout posts={posts} title={tag} />;
};

export default TagPostListPage;
