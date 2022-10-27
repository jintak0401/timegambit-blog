import siteMetadata from '@/data/siteMetadata';

import AboutList from '@/components/AboutList';
import { PageSEO } from '@/components/SEO';

export default function AboutPage() {
  return (
    <>
      <PageSEO
        title={`About - ${siteMetadata.author}`}
        description={siteMetadata.description}
      />
      <AboutList sectionName="Skills" />
      <hr />
      <AboutList sectionName="Experience" />
      <hr />
      <AboutList sectionName="Education" />
    </>
  );
}
