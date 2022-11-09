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

const seriesSet = new Set();
export async function getAllSeries() {
  if (seriesSet.size) return seriesSet;
  allBlogs.forEach(
    ({ series }) => series && seriesSet.add(GithubSlugger.slug(series))
  );
  return seriesSet;
}
