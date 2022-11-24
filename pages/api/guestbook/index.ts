import { RowDataPacket } from 'mysql2';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

import { db } from '@/lib/db';
import { UserType } from '@/lib/types';

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
      return res.status(200).json(guestbooks);
    }

    // POST
    const session = await getSession({ req });

    if (!session) {
      return res.status(403).send('Unauthorized');
    } else if (!req.body.body) {
      return res.status(400).send('Body is required');
    }

    const { email, name, image } = session.user as UserType;

    connection = await db.getConnection();
    await connection.beginTransaction();

    await connection.query<RowDataPacket[]>(queries.CREATE_GUESTBOOK, [
      email,
      name,
      image,
      req.body.body,
    ]);
    await connection.commit();

    return res.status(200).send({ result: 'success' });
  } catch (e) {
    connection && (await connection.rollback());
    return res.status(500).json({ message: (e as Error).message });
  } finally {
    connection && connection.release();
  }
}
