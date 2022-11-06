import Image from "next/image";
import Link from "next/link";

import about from "@/data/about";
import phrases from "@/data/phrases";
import siteMetadata from "@/data/siteMetadata";

import AboutList from "@/components/AboutList";
import { PageSEO } from "@/components/SEO";

const SELFIE_URL = "/static/images/selfie.jpg";

export default function AboutPage() {
  const { title, description } = phrases.About;
  return (
    <>
      <PageSEO
        title={`About - ${siteMetadata.author}`}
        description={siteMetadata.description}
      />
      <h1 className="basic-text text-3xl font-extrabold md:text-5xl">
        {title}
      </h1>
      {description && <p className="text-gray-500">{description}</p>}
      <section
        className="mb-7 mt-12 flex flex-col space-x-0 space-y-5 md:mt-20 md:mb-10 md:flex-row md:space-y-0 md:space-x-7">
        <Image
          alt="셀카"
          src={SELFIE_URL}
          placeholder="blur"
          blurDataURL={`/_next/image?url=${SELFIE_URL}&w=16&q=1`}
          width="250"
          height="250"
          layout="fixed"
        />
        <div className="flex flex-col justify-center">
          <h2 className="basic-text mb-4 text-2xl font-bold md:text-4xl">
            Contact & Channel
          </h2>
          <ul
            role="list"
            className="list-inside list-disc space-y-3 text-lg marker:text-primary-500"
          >
            {Object.entries(about.Contact).map(([key, value]) => (
              <li role="listitem" key={key}>
                <span className="basic-text -ml-1.5 inline-block w-[72px] md:w-20">
                  {key}.
                </span>
                <Link
                  href={`${value.includes("@") ? "mailto:" : ""}${value}`}
                >
                  <a
                    className="font-medium text-primary-500 hover:text-primary-600 hover:underline dark:hover:text-primary-400"
                  >
                    {value}
                  </a>
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
