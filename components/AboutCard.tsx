interface Props {
  title: string;
  date?: string;
  info: string[];
}

const AboutCard = ({ title, date, info }: Props) => {
  return (
    <article className="flex flex-col space-y-4 md:flex-row md:space-y-0">
      <div className="text- flex w-72 flex-col md:space-y-3">
        <h3 className="basic-text text-xl font-semibold md:text-3xl">
          {title}
        </h3>
        {date && <i className="text-gray-400 dark:text-gray-500">{date}</i>}
      </div>
      <ul
        role="list"
        className="basic-text list-inside list-disc space-y-3 marker:text-primary-500"
      >
        {info.map((piece) => (
          <li role="listitem" key={piece}>
            <span className="-ml-1.5">{piece}</span>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default AboutCard;
