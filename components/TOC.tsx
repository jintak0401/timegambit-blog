import { useState } from 'react';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export default function TOC() {
  const [currentId, setCurrentId] = useState<string>('');
  useIntersectionObserver(setCurrentId);

  return <div />;
}
