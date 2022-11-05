import about from '@/data/about';

import AboutCard from '@/components/AboutCard';

interface Props {
  sectionName: Exclude<keyof typeof about, 'Contact'>;
}

const AboutList = ({ sectionName }: Props) => {
  const data = about[sectionName];
  return (
    <section className="my-7 md:my-10">
      <h2 className="basic-text mb-7 text-2xl font-bold md:mb-20 md:text-4xl">
        {sectionName}
      </h2>
      <ul className="space-y-11 md:space-y-16">
        {data.map((piece) => (
          <li key={piece.title}>
            <AboutCard {...piece} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default AboutList;
