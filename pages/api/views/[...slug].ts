import { RowDataPacket } from 'mysql2';
import type { NextApiRequest, NextApiResponse } from 'next';
import * as process from 'process';

import { db } from '@/lib/db';

import queries from '../queries';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const slug = (req.query.slug as string[]).join('/');

  const method = req.method;
  if (slug === undefined) {
    return res.status(400).json({ message: `There is no post "${slug}"` });
  }
  if (method !== 'POST' && method !== 'GET') {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({ message: `Only accept "GET" or "POST"` });
  }

  const ipAddress =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0] ||
    req.socket.remoteAddress;

  if (method === 'POST' && process.env.OWN_IP === ipAddress) {
    return res
      .status(200)
      .json({ message: "View counts are not increased at owner's viewing" });
  }

  let connection = null;
  try {
    const queryMap = {
      GET: queries.CREATE_VIEW_COUNT_IF_NOT_EXIST,
      POST: queries.UPDATE_VIEW_COUNT,
    };

    connection = await db.getConnection();
    await connection.beginTransaction();
    await connection.query(queryMap[method], [slug]);
    const [result] = await connection.query<RowDataPacket[]>(
      queries.READ_VIEW_COUNT,
      [slug]
    );
    await connection.commit();

    return res.status(200).json({
      viewCount: result[0].count,
    });
  } catch (e) {
    connection && (await connection.rollback());
    return res.status(500).json({ message: (e as Error).message });
  } finally {
    connection && connection.release();
  }
}
