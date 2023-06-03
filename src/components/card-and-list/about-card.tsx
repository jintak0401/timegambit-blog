import { AboutCardType } from '@/types';

const AboutCard = ({ title, date, info }: AboutCardType) => {
  return (
    <div className="flex flex-col space-y-4 md:flex-row md:space-y-0">
      <div className="flex w-72 flex-col md:space-y-3">
        <h3 className="strong-text text-xl font-semibold md:text-3xl">
          {title}
        </h3>
        {date && <i className="weak-text">{date}</i>}
      </div>
      <ul
        role="list"
        className="strong-text list-inside list-disc space-y-3 marker:text-primary-400"
      >
        {info.map((item) => (
          <li role="listitem" key={item}>
            <span className="-ml-1.5">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AboutCard;
