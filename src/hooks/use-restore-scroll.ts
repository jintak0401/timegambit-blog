import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

import { scrollPosStore } from '@/lib/scroll-pos-store';

const { onCompleteRouteCb } = scrollPosStore;
export const useRestoreScroll = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(
    () => {
      onCompleteRouteCb(pathname);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname, searchParams]
  );
};
