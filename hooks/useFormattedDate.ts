import { useState } from 'react';

import siteMetadata from '@/data/siteMetadata';

const OPTIONS: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

const useFormattedDate = (date: string) => {
  const [formattedDate] = useState<string>(
    new Date(date).toLocaleDateString(siteMetadata.locale, OPTIONS)
  );

  return formattedDate;
};

export default useFormattedDate;
