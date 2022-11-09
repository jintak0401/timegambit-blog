import { writeFileSync } from 'fs';
import globby from 'globby';
import prettier from 'prettier';

import { allBlogs } from '../.contentlayer/generated/index.mjs';
import siteMetadata from '../data/siteMetadata.js';

(async () => {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js');
  const contentPages = allBlogs
    .map((x) => `/${x._raw.flattenedPath}`)
    .filter((x) => !x.draft && !x.canonicalUrl);
  const pages = await globby([
    'pages/*.{js|tsx}',
    'public/tags/**/*.xml',
    'public/series/**/*.xml',
    '!pages/_*.{js|tsx}',
    '!pages/api',
    '!pages/404.{js|tsx}',
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
                  .replace('.js', '')
                  .replace('.mdx', '')
                  .replace('.md', '')
                  .replace('/feed.xml', '');
                const route = path === '/index' ? '' : path;
                const [_, urlPath, slug] = route.split('/');
                const lastmod = urlPath === 'blog' ? allBlogs.find(p => p.slug === slug).lastmod : '';
                return `
                        <url>
                            <loc>${siteMetadata.siteUrl}${route}</loc>
                            ${lastmod && `<lastmod>${lastmod}</lastmod>`}
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
