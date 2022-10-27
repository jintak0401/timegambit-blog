interface Props {
  title: string;
  date?: string;
  info: string[];
}

const AboutCard = ({ title, date, info }: Props) => {
  return (
    <article className="flex flex-col space-y-4 lg:flex-row lg:space-y-0">
      <div className="flex flex-col space-y-3 lg:w-80">
        <h3 className="text-3xl font-semibold">{title}</h3>
        {date && <i>{date}</i>}
      </div>
      <ul
        role="list"
        className="list-inside list-disc space-y-3 marker:text-primary-500 lg:list-outside"
      >
        {info.map((piece) => (
          <li role="listitem" key={piece}>
            {piece}
          </li>
        ))}
      </ul>
    </article>
  );
};

export default AboutCard;
