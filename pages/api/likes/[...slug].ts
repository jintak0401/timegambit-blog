import { createHash } from 'crypto';
import { RowDataPacket } from 'mysql2';
import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '@/lib/db';

import siteMetadata from '@/data/siteMetadata';

import queries from '../queries';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method;
  const slug = ((req.query.slug || []) as string[]).join('/');
  if (!slug) {
    return res.status(400).json({ message: `There is no post "${slug}"` });
  }
  if (method !== 'POST' && method !== 'GET') {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({ message: `Only accept "GET" or "POST"` });
  }

  let connection = null;
  try {
    const ipAddress = req.headers['x-forwarded-for'] || '0.0.0.0';

    const encryptedIP = createHash('sha256')
      .update(ipAddress + (process.env.IP_ADDRESS_SALT as string), 'utf8')
      .digest('hex');

    connection = await db.getConnection();
    await connection.beginTransaction();
    if (method === 'POST') {
      const [userLikes] = await connection.query<RowDataPacket[]>(
        queries.READ_USER_LIKE_COUNT,
        [slug, encryptedIP]
      );
      const count = Math.min(
        req.body.count > 0 ? req.body.count : 0,
        siteMetadata.maxLikeCount - (userLikes[0]?.count || 0)
      );

      await Promise.all([
        connection.query<RowDataPacket[]>(queries.UPDATE_POST_LIKE_COUNT, [
          count,
          slug,
        ]),
        connection.query<RowDataPacket[]>(queries.UPDATE_USER_LIKE_COUNT, [
          slug,
          encryptedIP,
          count,
          count,
        ]),
      ]);
    }
    const [[postLikes], [userLikes]] = await Promise.all([
      connection.query<RowDataPacket[]>(queries.READ_POST_LIKE_COUNT, [
        slug,
      ]) as Promise<RowDataPacket[]>,
      connection.query<RowDataPacket[]>(queries.READ_USER_LIKE_COUNT, [
        slug,
        encryptedIP,
      ]) as Promise<RowDataPacket[]>,
    ]);
    await connection.commit();

    return res.status(200).json({
      postLikes: postLikes[0].count || 0,
      userLikes: userLikes[0]?.count || 0,
    });
  } catch (e) {
    connection && (await connection.rollback());
    return res.status(500).json({
      message: (e as Error).message,
    });
  } finally {
    connection && connection.release();
  }
};

export default handler;
