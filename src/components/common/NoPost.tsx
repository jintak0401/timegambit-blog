import phrases from 'data/phrases';

const NoPost = () => {
  return (
    <strong className="strong-text duration-default mt-10 block text-center text-2xl font-bold sm:text-3xl xl:text-4xl">
      {phrases.Blog.noPost}
    </strong>
  );
};

export default NoPost;
