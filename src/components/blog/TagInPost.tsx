import { slug } from 'github-slugger';
import Link from 'next/link';
import { AiFillTag } from 'react-icons/ai';

interface Props {
  title: string;
}

const TagInPost = ({ title }: Props) => {
  return (
    <Link
      href={`/tags/${slug(title)}`}
      className="group flex items-center gap-1.5 rounded-md bg-gray-200 py-1 px-2
        text-sm text-gray-600 duration-200 hover:bg-gray-600 hover:text-gray-200
        dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
    >
      <AiFillTag
        className="h-[14px] w-[14px] duration-200 group-hover:text-gray-200
         dark:text-gray-200"
      />
      {title}
    </Link>
  );
};

export default TagInPost;
