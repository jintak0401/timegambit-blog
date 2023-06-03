import phrases from 'data/phrases';

import { PostListItem } from '@/types';

import PostCard from './post-card';

interface Props {
  posts: PostListItem[];
}

const PostList = ({ posts }: Props) => {
  // when post list is not empty
  if (posts.length) {
    return (
      <ul className="space-y-6 py-4">
        {posts.map((post) => (
          <li key={post.title}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    );
  }
  // post list is empty
  return (
    <strong className="strong-text duration-default mt-10 block text-center text-2xl font-bold sm:text-3xl xl:text-4xl">
      {phrases.Blog.noPost}
    </strong>
  );
};

export default PostList;
