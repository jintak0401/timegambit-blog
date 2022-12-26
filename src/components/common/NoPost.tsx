import phrases from 'data/phrases';

const NoPost = () => {
  return (
    <strong className="strong-text mt-10 block text-center text-2xl font-bold duration-500 sm:text-3xl xl:text-4xl">
      {phrases.Blog.noPost}
    </strong>
  );
};

export default NoPost;
