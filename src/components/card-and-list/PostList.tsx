import { PostListItem } from '@/lib/types';

import NoPost from '@/components/common/NoPost';

import PostCard from './PostCard';

interface Props {
  posts: PostListItem[];
}

const PostList = ({ posts }: Props) => {
  if (posts.length) {
    return (
      <ul className="space-y-8 py-4">
        {posts.map((post) => (
          <li key={post.title}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    );
  }
  return <NoPost />;
};

export default PostList;
