import phrases from 'data/phrases';
import projectData from 'data/projectData';
import siteMetadata from 'data/siteMetadata.mjs';

import ProjectCard from '@/components/card-and-list/ProjectCard';
import { PageSEO } from '@/components/common/SEO';

export default function ProjectPage() {
  return (
    <>
      <PageSEO
        title={`Projects - ${siteMetadata.author}`}
        description={phrases.Seo.projectDesc || siteMetadata.description}
      />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {phrases.Project.title}
          </h1>
          <div className="middle-text text-lg leading-7">
            {phrases.Project.description}
          </div>
        </div>
        <div className="-m-4 flex flex-wrap py-12">
          {projectData.map((d) => (
            <ProjectCard
              key={d.title}
              title={d.title}
              description={d.description}
              imgSrc={d.imgSrc}
              href={d.href}
            />
          ))}
        </div>
      </div>
    </>
  );
}