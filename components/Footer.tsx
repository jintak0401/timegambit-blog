import siteMetadata from '@/data/siteMetadata';

import SocialIcon from '@/components/social-icons';

const ICON_SIZE = 5;

export const Footer = () => {
  return (
    <footer>
      <div className="my-16 flex flex-col items-center">
        <div className="mb-4 text-lg text-gray-500 dark:text-gray-400">
          {siteMetadata.description}
        </div>
        <div className="mb-3 flex space-x-4">
          {siteMetadata.email && (
            <SocialIcon
              kind="mail"
              href={`mailto:${siteMetadata.email}`}
              size={ICON_SIZE}
            />
          )}
          {siteMetadata.github && (
            <SocialIcon
              kind="github"
              href={siteMetadata.github}
              size={ICON_SIZE}
            />
          )}
          {siteMetadata.facebook && (
            <SocialIcon
              kind="facebook"
              href={siteMetadata.facebook}
              size={ICON_SIZE}
            />
          )}
          {siteMetadata.youtube && (
            <SocialIcon
              kind="youtube"
              href={siteMetadata.youtube}
              size={ICON_SIZE}
            />
          )}
          {siteMetadata.linkedin && (
            <SocialIcon
              kind="linkedin"
              href={siteMetadata.linkedin}
              size={ICON_SIZE}
            />
          )}
          {siteMetadata.twitter && (
            <SocialIcon
              kind="twitter"
              href={siteMetadata.twitter}
              size={ICON_SIZE}
            />
          )}
          <SocialIcon kind="rss" size={ICON_SIZE} href="/feed.xml" />
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>•</div>
          <div>{siteMetadata.author}</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
