import { mkdirSync, writeFileSync } from "fs";
import { slug } from "github-slugger";
import path from "path";

import { escape } from "./html-escaper.mjs";
import { allBlogs } from "../.contentlayer/generated/Blog/_index.mjs";
import siteMetadata from "../data/siteMetadata.mjs";
import { getAllSeries, getAllTags } from "../src/lib/get-blog-info.mjs";
import seriesData from "../data/series-data.mjs";

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
      const sluggedTag = slug(tag);
      const filteredPosts = allBlogs.filter(
        (post) =>
          post.draft !== true &&
          post.tags.map((t) => slug(t)).includes(sluggedTag)
      );
      const rss = generateRss(filteredPosts, `tags/${sluggedTag}/feed.xml`);
      const rssPath = path.join("public", "tags", sluggedTag);
      mkdirSync(rssPath, { recursive: true });
      writeFileSync(path.join(rssPath, "feed.xml"), rss);
    }
  }

  // RSS for series
  if (allBlogs.length > 0) {
    const series = await getAllSeries();
    for (const aSeries of Object.keys(series)) {
      const filteredPosts = allBlogs.filter(
        (post) =>
          post.draft !== true && post.series === aSeries
      );
      const seriesSlug = slug(seriesData[aSeries]?.slug || aSeries);
      const rss = generateRss(filteredPosts, `series/${seriesSlug}/feed.xml`);
      const rssPath = path.join("public", "series", seriesSlug);
      mkdirSync(rssPath, { recursive: true });
      writeFileSync(path.join(rssPath, "feed.xml"), rss);
    }
  }
})();
