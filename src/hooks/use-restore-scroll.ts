import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

import { scrollPosStore } from '@/lib/scrollPosStore';

const { onCompleteCb } = scrollPosStore;
export const useRestoreScroll = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(
    () => {
      onCompleteCb(pathname);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname, searchParams]
  );
};
