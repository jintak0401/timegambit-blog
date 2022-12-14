import about from 'data/about';
import phrases from 'data/phrases';
import siteMetadata from 'data/siteMetadata.mjs';
import NextImage from 'next/image';
import Link from 'next/link';

import AboutList from '@/components/card-and-list/AboutList';
import { PageSEO } from '@/components/common/SEO';

export default function AboutPage() {
  const { title, description } = phrases.About;
  const SELFIE_URL = about.Selfie;
  return (
    <>
      <PageSEO
        title={`About - ${siteMetadata.author}`}
        description={phrases.Seo.aboutDesc || siteMetadata.description}
      />
      <h1 className="strong-text text-3xl font-extrabold md:text-5xl">
        {title}
      </h1>
      {description && <p className="text-gray-500">{description}</p>}
      <section className="mb-7 mt-12 flex flex-col space-x-0 space-y-5 md:mt-20 md:mb-10 md:flex-row md:space-y-0 md:space-x-7">
        <NextImage alt="셀카" src={SELFIE_URL} width="250" height="250" />
        <div className="flex flex-col justify-center">
          <h2 className="strong-text mb-4 text-2xl font-bold md:text-4xl">
            Contact & Channel
          </h2>
          <ul
            role="list"
            className="list-inside list-disc space-y-3 text-lg marker:text-primary-400"
          >
            {Object.entries(about.Contact).map(([key, value]) => (
              <li role="listitem" key={key}>
                <span className="strong-text -ml-1.5 inline-block w-[72px] md:w-20">
                  {key}.
                </span>
                <Link
                  href={`${value.includes('@') ? 'mailto:' : ''}${value}`}
                  className="primary-color-text font-medium hover:underline"
                >
                  {value}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <hr />
      <AboutList sectionName="Skills" />
      <hr />
      <AboutList sectionName="Experience" />
      <hr />
      <AboutList sectionName="Education" />
    </>
  );
}
