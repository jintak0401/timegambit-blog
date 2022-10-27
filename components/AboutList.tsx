import about from '@/data/about';

import AboutCard from '@/components/AboutCard';

interface Props {
  sectionName: Exclude<keyof typeof about, 'Contact'>;
}

const AboutList = ({ sectionName }: Props) => {
  const data = about[sectionName];
  return (
    <section className="my-20">
      <h2 className="mb-20 text-4xl font-bold">{sectionName}</h2>
      <ul className="space-y-16">
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
