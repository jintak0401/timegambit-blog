import { slug } from 'github-slugger';
import Link from 'next/link';

interface Props {
  text: string;
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="primary-color-text mr-3 font-medium"
    >
      {text.split(' ').join('-')}
    </Link>
  );
};

export default Tag;
