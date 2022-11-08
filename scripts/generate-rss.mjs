import { mkdirSync, writeFileSync } from "fs";
import GithubSlugger from "github-slugger";
import path from "path";

import { escape } from "./htmlEscaper.mjs";
import { allBlogs } from "../.contentlayer/generated/Blog/_index.mjs";
import siteMetadata from "../data/siteMetadata.js";
import { getAllCategories, getAllTags } from "../lib/getBlogInfo.mjs";

const generateRssItem = (post) => `
  <item>
    <guid>${siteMetadata.siteUrl}/blog/${post.slug}</guid>
    <title>${escape(post.title)}</title>
    <link>${siteMetadata.siteUrl}/blog/${post.slug}</link>
    ${post.summary && `<description>${escape(post.summary)}</description>`}
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    <author>${siteMetadata.email} (${siteMetadata.author})</author>
    ${post.tags && post.tags.map((t) => `<category>${t}</category>`).join("")}
  </item>
`;

const generateRss = (posts, page = "feed.xml") => `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${escape(siteMetadata.title)}</title>
      <link>${siteMetadata.siteUrl}/blog</link>
      <description>${escape(siteMetadata.description)}</description>
      <language>${siteMetadata.language}</language>
      <managingEditor>${siteMetadata.email} (${
  siteMetadata.author
})</managingEditor>
      <webMaster>${siteMetadata.email} (${siteMetadata.author})</webMaster>
      <lastBuildDate>${new Date(posts[0].date).toUTCString()}</lastBuildDate>
      <atom:link href="${
  siteMetadata.siteUrl
}/${page}" rel="self" type="application/rss+xml"/>
      ${posts.map(generateRssItem).join("")}
    </channel>
  </rss>
`;

(async () => {
  // RSS for blog post
  if (allBlogs.length > 0) {
    const rss = generateRss(allBlogs.filter(post => post.draft !== true));
    writeFileSync("./public/feed.xml", rss);
  }

  // RSS for tags
  if (allBlogs.length > 0) {
    const tags = await getAllTags();
    for (const tag of Object.keys(tags)) {
      const filteredPosts = allBlogs.filter(
        (post) =>
          post.draft !== true &&
          post.tags.map((t) => GithubSlugger.slug(t)).includes(tag)
      );
      const rss = generateRss(filteredPosts, `tags/${tag}/feed.xml`);
      const rssPath = path.join("public", "tags", tag);
      mkdirSync(rssPath, { recursive: true });
      writeFileSync(path.join(rssPath, "feed.xml"), rss);
    }
  }

  // RSS for categories
  if (allBlogs.length > 0) {
    const categories = await getAllCategories();
    for (const category of categories) {
      const filteredPosts = allBlogs.filter(
        (post) =>
          post.draft !== true && GithubSlugger.slug(post.category) === category
      );
      const rss = generateRss(filteredPosts, `categories/${category}/feed.xml`);
      const rssPath = path.join("public", "categories", category);
      mkdirSync(rssPath, { recursive: true });
      writeFileSync(path.join(rssPath, "feed.xml"), rss);
    }
  }
})();