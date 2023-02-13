import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function SectionContainer({ children }: Props) {
  return (
    <>
      <div className="fixed top-0 left-0 -z-10 h-screen w-screen bg-white transition-colors duration-300 dark:bg-gray-900" />
      <div className="w-section">{children}</div>
    </>
  );
}
