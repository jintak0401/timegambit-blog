import NextLink from 'next/link';

import { slug } from 'github-slugger';
import { AiFillTag } from 'react-icons/ai';

interface Props {
  title: string;
}

const TagInPost = ({ title }: Props) => {
  return (
    <NextLink
      href={`/tags/${slug(title)}`}
      className="group flex items-center gap-1.5 rounded-md bg-gray-200 px-2 py-1 text-sm text-gray-600 duration-200 hover:bg-gray-600 hover:text-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
    >
      <AiFillTag className="h-[14px] w-[14px] group-hover:text-gray-200 dark:text-gray-200" />
      {title}
    </NextLink>
  );
};

export default TagInPost;
