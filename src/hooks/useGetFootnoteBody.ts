import { useEffect, useState } from 'react';

const removeBackTag = (innerHtml: string) => {
  return innerHtml.replace(
    /<a href="#user-content-fnref-[0-9a-zA-Z%]+" aria-label="Back to content".*>↩<\/a>/g,
    ''
  );
};

const useGetFootnoteBody = (idx: string) => {
  const [body, setBody] = useState('');

  useEffect(() => {
    const footnotes = document.querySelector(
      `.footnotes ol>li:nth-child(${idx})`
    );
    setBody(removeBackTag(footnotes?.innerHTML ?? ''));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return body;
};

export default useGetFootnoteBody;
