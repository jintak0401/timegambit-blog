import slugger from 'github-slugger';
import Link from 'next/link';

interface Props {
  text: string;
}

const Tag = ({ text }: Props) => {
  return (
    <Link href={`/tags/${slugger.slug(text)}`}>
      <a className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
        {text.split(' ').join('-')}
      </a>
    </Link>
  );
};

export default Tag;
