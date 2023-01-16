import siteMetadata from 'data/siteMetadata.mjs';
import dynamic from 'next/dynamic';

const GiscusComponent = dynamic(() => import('./Giscus'), {
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
