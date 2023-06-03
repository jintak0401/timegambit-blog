import { allBlogs } from "../../.contentlayer/generated/index.mjs";
import { slug } from "github-slugger";
import seriesData from "../../data/series-data.mjs";

const tagCount = {};

export const getAllTags = async () => {
  if (Object.keys(tagCount).length) return tagCount;
  allBlogs.forEach((file) => {
    if (file.tags && file.draft !== true) {
      file.tags.forEach((tag) => {
        if (tag in tagCount) {
          tagCount[tag] += 1;
        } else {
          tagCount[tag] = 1;
        }
      });
    }
  });
  return tagCount;
}

const seriesInfo = {};

export const getAllSeries = async () => {

  if (Object.keys(seriesInfo).length) return seriesInfo;
  for (const { series, lastmod, images } of allBlogs) {
    if (!series) continue;

    if (!seriesInfo[series]) {
      const img = seriesData[series]?.image || images[0];
      const seriesSlug = slug(seriesData[series]?.slug) || series;
      seriesInfo[series] = { title: series, length: 0, lastmod, image: img.replace('public', ''), href: seriesSlug };
    }

    seriesInfo[series].length++;
    seriesInfo[series].lastmod < lastmod && (seriesInfo[series].lastmod = lastmod);
  }

  return seriesInfo;
}
