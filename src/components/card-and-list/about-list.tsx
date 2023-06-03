import { AboutCardType } from '@/types';

import AboutCard from './about-card';

interface Props {
  sectionName: string;
  sectionData: AboutCardType[];
}

const AboutList = ({ sectionName, sectionData }: Props) => {
  return (
    <section className="my-7 md:my-10">
      <h2 className="strong-text mb-7 text-2xl font-bold md:mb-20 md:text-4xl">
        {sectionName}
      </h2>
      <ul className="space-y-11 md:space-y-16">
        {sectionData.map((item) => (
          <li key={item.title}>
            <AboutCard {...item} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default AboutList;
