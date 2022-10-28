import about from '@/data/about';
import siteMetadata from '@/data/siteMetadata';

import AboutList from '@/components/AboutList';
import Image from '@/components/Image';
import Link from '@/components/Link';
import { PageSEO } from '@/components/SEO';

const SELFIE_URL = '/static/images/selfie.jpg';

export default function AboutPage() {
  return (
    <>
      <PageSEO
        title={`About - ${siteMetadata.author}`}
        description={siteMetadata.description}
      />
      <section className="mb-20 flex flex-col space-x-0 space-y-5 md:flex-row md:space-y-0 md:space-x-7">
        <Image
          alt="셀카"
          src={SELFIE_URL}
          placeholder="blur"
          blurDataURL={`/_next/image?url=/static/images/blog/${SELFIE_URL}&w=16&q=1`}
          width="250"
          height="250"
          layout="fixed"
        />
        <div className="flex flex-col justify-center">
          <h2 className="mb-4 text-4xl font-bold">Contact & Channel</h2>
          <ul
            role="list"
            className="list-inside list-disc space-y-3 text-lg marker:text-primary-500"
          >
            {Object.entries(about.Contact).map(([key, value]) => (
              <li role="listitem" key={key}>
                <span className="inline-block w-[72px] md:w-20">{key}.</span>
                <Link
                  className="font-medium text-primary-500 hover:text-primary-600 hover:underline dark:hover:text-primary-400"
                  href={`${value.includes('@') ? 'mailto:' : ''}${value}`}
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
