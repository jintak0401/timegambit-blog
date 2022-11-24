import { ResultSetHeader } from 'mysql2';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

import { db } from '@/lib/db';
import { UserType } from '@/lib/types';

import queries from '@/pages/api/queries';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'DELETE') {
    return res.status(400).send('Only DELETE method allowed');
  }

  const session = await getSession({ req });

  if (!session) {
    return res.status(403).send('Unauthorized');
  }

  let connection = null;
  try {
    const { id } = req.query;
    const { email } = session.user as UserType;

    connection = await db.getConnection();
    await connection.beginTransaction();
    const [result] = await connection.query<ResultSetHeader>(
      queries.DELETE_GUESTBOOK,
      [id, email]
    );
    await connection.commit();

    if (result.affectedRows === 1) {
      return res.status(200).send('Success');
    } else {
      return res.status(400).send('No Row there');
    }
  } catch (e) {
    connection && (await connection.rollback());
    return res.status(500).json({ message: (e as Error).message });
  } finally {
    connection && connection.release();
  }
};

export default handler;
