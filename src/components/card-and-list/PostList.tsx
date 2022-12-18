import phrases from 'data/phrases';

import { PostListItem } from '@/lib/types';

import PostCard from './PostCard';

interface Props {
  posts: PostListItem[];
}

const PostList = ({ posts }: Props) => {
  return (
    <ul className="space-y-8 py-4">
      {!posts.length && phrases.Blog.noPost}
      {posts.map((post) => (
        <li key={post.title}>
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  );
};

export default PostList;
