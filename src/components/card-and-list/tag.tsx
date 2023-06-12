import NextLink from 'next/link';

import { slug } from 'github-slugger';

interface Props {
  text: string;
}

const Tag = ({ text }: Props) => {
  return (
    <NextLink
      href={`/tags/${slug(text)}`}
      className="primary-color-text mr-3 font-medium"
    >
      {text.split(' ').join('-')}
    </NextLink>
  );
};

export default Tag;
