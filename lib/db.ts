import mysql from 'mysql2/promise';

import { isProd } from '@/lib/isProduction';

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var db: mysql.Pool | undefined;
}

export const db =
  global.db ||
  mysql.createPool({
    uri: process.env.DATABASE_URL,
  });

if (isProd) global.db = db;
