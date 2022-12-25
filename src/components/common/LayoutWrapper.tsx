import { ReactNode } from 'react';

import Footer from './Footer';
import Header from './Header';
import SectionContainer from './SectionContainer';

interface Props {
  children: ReactNode;
  className?: string;
}

const LayoutWrapper = ({ children, className }: Props) => {
  return (
    <SectionContainer>
      <div className="flex h-screen flex-col justify-between">
        <Header />
        <main className={`mb-auto mt-24 ${className ? className : ''}`}>
          {children}
        </main>
        <hr />
        <Footer />
      </div>
    </SectionContainer>
  );
};

export default LayoutWrapper;
