import { useTheme } from 'next-themes';
import React from 'react';

import siteMetadata from '@/data/siteMetadata';
import Giscus, {
  BooleanString,
  InputPosition,
  Mapping,
  Repo,
} from '@giscus/react';

const GiscusComment = () => {
  const { theme, resolvedTheme } = useTheme();
  const commentsTheme =
    siteMetadata.comment.giscusConfig.themeURL === ''
      ? theme === 'dark' || resolvedTheme === 'dark'
        ? siteMetadata.comment.giscusConfig.darkTheme
        : siteMetadata.comment.giscusConfig.theme
      : siteMetadata.comment.giscusConfig.themeURL;

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
  return (
    <div className="pt-6 pb-6 text-center text-gray-700 dark:text-gray-300">
      <Giscus
        repo={repo as Repo}
        repoId={repositoryId as string}
        category={category}
        categoryId={categoryId}
        mapping={mapping as Mapping}
        reactionsEnabled={reactions as BooleanString}
        emitMetadata={emitMetaData as BooleanString}
        inputPosition={inputPosition as InputPosition}
        theme={commentsTheme}
        lang={lang}
        loading="eager"
      />
    </div>
  );
};

export default GiscusComment;
