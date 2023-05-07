import { PropsWithChildren } from 'react';

export default function PageTitle({ children }: PropsWithChildren) {
  return (
    <h1 className="strong-text text-3xl font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
      {children}
    </h1>
  );
}
