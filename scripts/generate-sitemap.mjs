import { writeFileSync } from 'fs';
import {globby} from 'globby';
import prettier from 'prettier';

import { allBlogs } from '../.contentlayer/generated/index.mjs';
import siteMetadata from '../data/siteMetadata.js';

(async () => {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js');
  const contentPages = allBlogs
    .map((x) => `/${x._raw.flattenedPath}`)
    .filter((x) => !x.draft && !x.canonicalUrl);
  const pages = await globby([
    'pages/*.tsx',
    'public/tags/**/*.xml',
    'public/series/**/*.xml',
    '!pages/_*.tsx',
    '!pages/api',
    '!pages/404.tsx',
  ]);

  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages
              .concat(contentPages)
              .map((page) => {
                const path = page
                  .replace('pages/', '/')
                  .replace('public/', '/')
                  .replace('.tsx', '')
                  .replace('.mdx', '')
                  .replace('.md', '')
                  .replace('/feed.xml', '');
                const route = path === '/index' ? '' : path;
                return `<url>
                            <loc>${siteMetadata.siteUrl}${route}</loc>
                        </url>
                        `;
              })
              .join('')}
        </urlset>
    `;

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html',
  });
  writeFileSync('public/sitemap.xml', formatted);
})();
