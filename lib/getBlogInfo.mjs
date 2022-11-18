import { allBlogs } from "../.contentlayer/generated/Blog/_index.mjs";
import GithubSlugger from "github-slugger";

const tagCount = {};
export async function getAllTags() {
  if (Object.keys(tagCount).length) return tagCount;
  allBlogs.forEach((file) => {
    if (file.tags && file.draft !== true) {
      file.tags.forEach((tag) => {
        const formattedTag = GithubSlugger.slug(tag);
        if (formattedTag in tagCount) {
          tagCount[formattedTag] += 1;
        } else {
          tagCount[formattedTag] = 1;
        }
      });
    }
  });
  return tagCount;
}

const seriesInfo = {};
export async function getAllSeries() {
  if (Object.keys(seriesInfo).length) return seriesInfo;
  allBlogs.forEach(({series, lastmod , images}) => {
    if (!series) return;

    if (!seriesInfo[series]) {
      seriesInfo[series] = {title: series, length: 0, lastmod, image: images[0], href: GithubSlugger.slug(series) };
    }

    seriesInfo[series].length++;
    seriesInfo[series].lastmod < lastmod && (seriesInfo[series].lastmod = lastmod);
  });

  return seriesInfo;
}
