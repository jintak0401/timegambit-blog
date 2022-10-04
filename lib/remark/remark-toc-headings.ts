import slugger from 'github-slugger';
import { toString } from 'mdast-util-to-string';
import { remark } from 'remark';
import { Parent } from 'unist';
import { visit } from 'unist-util-visit';

import { Heading, Toc } from '@/lib/types';

export function remarkTocHeadings() {
  // @ts-ignore
  return (tree: Parent, file) => {
    const toc: Toc = [];
    visit(tree, 'heading', (node: Heading) => {
      const textContent = toString(node);
      toc.push({
        value: textContent,
        url: '#' + slugger.slug(textContent),
        depth: node.depth,
      });
    });
    file.data.toc = toc;
  };
}

/**
 *
 * @param {string} markdown
 * @return {Toc} toc
 */
export async function extractTocHeadings(markdown: string) {
  const vfile = await remark().use(remarkTocHeadings).process(markdown);
  return vfile.data.toc;
}
