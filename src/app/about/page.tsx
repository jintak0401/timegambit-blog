import { Fragment } from 'react';
import { Metadata } from 'next';
import NextImage from 'next/image';
import Link from 'next/link';

import about from 'data/about';
import phrases from 'data/phrases';
import siteMetadata from 'data/site-metadata.mjs';

import { omit } from '@/lib/contentlayer';
import { generateDefaultMetadata } from '@/lib/metadata';

import AboutList from '@/components/card-and-list/about-list';

import { AboutCardType } from '@/types';

export const generateMetadata = (): Metadata => {
  const { openGraph, twitter, ...rest } = generateDefaultMetadata({
    title: 'About',
    description: phrases.Seo.aboutDesc || siteMetadata.description,
    url: `${siteMetadata.siteUrl}/about`,
  });
  openGraph.type = 'profile';

  return {
    openGraph,
    twitter,
    ...rest,
  };
};

const SELFIE_URL = about.Selfie;
const EXCLUDED_FROM_SECTION_LIST: (keyof typeof about)[] = [
  'Contact',
  'Selfie',
];

const AboutPage = () => {
  const { title, description } = phrases.About;
  const sectionList = omit(about, EXCLUDED_FROM_SECTION_LIST);
  return (
    <>
      <h1 className="strong-text text-3xl font-extrabold md:text-5xl">
        {title}
      </h1>
      {description && <div className="text-gray-500">{description}</div>}
      <section className="mb-7 mt-12 flex flex-col space-x-0 space-y-5 md:mb-10 md:mt-20 md:flex-row md:space-x-7 md:space-y-0">
        <NextImage alt="selfie" src={SELFIE_URL} width="250" height="250" />
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
      {Object.entries(sectionList).map(([sectionName, sectionData]) => (
        <Fragment key={sectionName}>
          <hr />
          <AboutList
            sectionName={sectionName}
            sectionData={sectionData as AboutCardType[]}
          />
        </Fragment>
      ))}
    </>
  );
};

export default AboutPage;
