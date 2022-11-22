import { RowDataPacket } from 'mysql2';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

import { db } from '@/lib/db';

import queries from '@/pages/api/queries';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let connection = null;
  try {
    if (req.method === 'GET') {
      connection = await db.getConnection();
      const [guestbooks] = await connection.query<RowDataPacket[]>(
        queries.READ_ALL_GUESTBOOK
      );
      return res.status(200).json({ guestbooks });
    }

    const session = await getSession({ req });

    if (!session) {
      return res.status(403).send('Unauthorized');
    }

    connection = await db.getConnection();
    const [result] = await connection.query<RowDataPacket[]>(
      queries.READ_ALL_VIEW_COUNT
    );
    return res.status(200).json({ count: result[0].count });
  } catch (e) {
    return res.status(500).json({ message: (e as Error).message });
  } finally {
    connection && connection.release();
  }
}
