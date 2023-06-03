import dynamic from 'next/dynamic';

import siteMetadata from 'data/site-metadata.mjs';

const GiscusComponent = dynamic(() => import('./giscus'), {
  ssr: false,
});

const Comments = () => {
  const comment = siteMetadata.comment;
  if (!comment || Object.keys(comment).length === 0) return <></>;
  return (
    <div id="comment">
      {siteMetadata.comment && siteMetadata.comment.provider === 'giscus' && (
        <GiscusComponent />
      )}
    </div>
  );
};

export default Comments;
