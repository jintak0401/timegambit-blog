import phrases from 'data/phrases';
import siteMetadata from 'data/siteMetadata.mjs';

const OPTIONS: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

const ONE_DAY_MILLISECONDS = 60 * 60 * 24 * 1000;

const formattedDate = (date: string, absolute = true) => {
  const createdAt = new Date(date);
  if (absolute)
    return createdAt.toLocaleDateString(siteMetadata.locale, OPTIONS);

  createdAt.setHours(0, 0, 0, 0);
  const ms = Number(new Date().setHours(0, 0, 0, 0)) - Number(createdAt);
  if (ms === 0) return phrases.formattingDate.today; // today
  const days = ms / ONE_DAY_MILLISECONDS;
  if (days < 7) return `${Math.floor(days)}${phrases.formattingDate.daysAgo}`; // days ago
  const weeks = days / 7;
  if (weeks < 5)
    return `${Math.floor(weeks)}${phrases.formattingDate.weeksAgo}`; // weeks ago
  const months = days / 30;
  if (months < 12)
    return `${Math.floor(months)}${phrases.formattingDate.monthsAgo}`; // months ago
  const years = days / 365;
  return `${Math.floor(years)}${phrases.formattingDate.yearsAgo}`; // years ago
};

export default formattedDate;
