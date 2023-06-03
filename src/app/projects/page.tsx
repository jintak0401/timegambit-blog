import phrases from 'data/phrases';
import projectData from 'data/project-data';
import siteMetadata from 'data/site-metadata.mjs';

import { generateDefaultMetadata } from '@/lib/metadata';

import ProjectCard from '@/components/card-and-list/project-card';

export const metadata = generateDefaultMetadata({
  title: 'Projects',
  description: phrases.Seo.projectDesc || siteMetadata.description,
  url: `${siteMetadata.siteUrl}/projects`,
});

const ProjectPage = () => {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
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
  );
};

export default ProjectPage;
