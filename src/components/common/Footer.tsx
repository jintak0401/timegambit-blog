import siteMetadata from 'data/siteMetadata.mjs';

import SocialIcon from '@/components/social-icons';

const ICON_SIZE = 20;

export const Footer = () => {
  return (
    <footer>
      <div className="middle-text my-5 flex flex-col items-center sm:my-10">
        <div className="mb-4 text-lg">{siteMetadata.description}</div>
        <div className="mb-3 flex items-center space-x-4">
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
        <div className="mb-2 flex space-x-2 text-sm">
          <span>{`© ${new Date().getFullYear()}`}</span>
          <span>•</span>
          <span>{siteMetadata.author}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
