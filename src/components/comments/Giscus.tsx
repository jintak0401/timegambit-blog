import phrases from 'data/phrases';
import siteMetadata from 'data/siteMetadata.mjs';
import { useTheme } from 'next-themes';
import React, { useCallback, useEffect, useState } from 'react';

const Giscus = () => {
  const [enableLoadComments, setEnabledLoadComments] = useState(true);
  const { theme, resolvedTheme } = useTheme();
  const commentsTheme =
    siteMetadata.comment.giscusConfig.themeURL === ''
      ? theme === 'dark' || resolvedTheme === 'dark'
        ? siteMetadata.comment.giscusConfig.darkTheme
        : siteMetadata.comment.giscusConfig.theme
      : siteMetadata.comment.giscusConfig.themeURL;

  const COMMENTS_ID = 'comments-container';

  const LoadComments = useCallback(() => {
    setEnabledLoadComments(false);

    const {
      repo,
      repositoryId,
      category,
      categoryId,
      mapping,
      reactions,
      emitMetaData,
      inputPosition,
      lang,
    } = siteMetadata.comment.giscusConfig;

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', repo as string);
    script.setAttribute('data-repo-id', repositoryId as string);
    script.setAttribute('data-category', category as string);
    script.setAttribute('data-category-id', categoryId as string);
    script.setAttribute('data-mapping', mapping);
    script.setAttribute('data-reactions-enabled', reactions);
    script.setAttribute('data-emit-metadata', emitMetaData);
    script.setAttribute('data-input-position', inputPosition);
    script.setAttribute('data-lang', lang);
    script.setAttribute('data-theme', commentsTheme);
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    const comments = document.getElementById(COMMENTS_ID);
    if (comments) comments.appendChild(script);

    return () => {
      const comments = document.getElementById(COMMENTS_ID);
      if (comments) comments.innerHTML = '';
    };
  }, [commentsTheme]);

  // Reload on theme change
  useEffect(() => {
    const iframe = document.querySelector('iframe.giscus-frame');
    if (!iframe) return;
    LoadComments();
  }, [LoadComments]);

  return (
    <div className="pt-6 pb-6 text-center text-gray-700 dark:text-gray-300">
      {enableLoadComments && (
        <button onClick={LoadComments} className="hover:underline md:text-lg">
          {phrases.Blog.loadComments}
        </button>
      )}
      <div className={`${enableLoadComments ? 'h-0' : ''}`} id={COMMENTS_ID} />
    </div>
  );
};

export default Giscus;
