import TOCList from '@/components/TOC/TOCList';

const LargeWidthTOC = () => {
  return (
    <aside className="absolute top-0 left-full hidden h-full break-words 2xl:inline-block">
      <ul className="sticky top-10 ml-12 w-[calc(49vw-555px)] space-y-1.5 border-l-2 pl-5 transition-colors dark:border-gray-700">
        <TOCList />
      </ul>
    </aside>
  );
};

export default LargeWidthTOC;
