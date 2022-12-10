import { RowDataPacket } from 'mysql2';
import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '@/lib/db';

import queries from '@/pages/api/queries';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method;
  if (method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ message: `Only accept "GET"` });
  }

  let connection = null;
  try {
    connection = await db.getConnection();
    const [result] = await connection.query<RowDataPacket[]>(
      queries.READ_ALL_LIKE_COUNT
    );
    return res.status(200).json({ count: result[0].count });
  } catch (e) {
    return res.status(500).json({ message: (e as Error).message });
  } finally {
    connection && connection.release();
  }
};

export default handler;
