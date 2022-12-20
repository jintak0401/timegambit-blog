import { RowDataPacket } from 'mysql2';
import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '@/lib/db';

import queries from '../queries';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let connection = null;
  try {
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
