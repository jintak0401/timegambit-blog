import TocList from './toc-list';
const LargeWidthToc = () => {
  return (
    <aside className="absolute left-full top-0 hidden h-full break-words 2xl:inline-block">
      <ul className="sticky top-10 ml-12 w-[calc(49vw-555px)] space-y-1.5 border-l-2 pl-5 transition-colors dark:border-gray-700">
        <TocList />
      </ul>
    </aside>
  );
};

export default LargeWidthToc;
