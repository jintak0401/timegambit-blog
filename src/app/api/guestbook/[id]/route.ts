import { NextRequest, NextResponse } from 'next/server';

import { ResultSetHeader } from 'mysql2';
import { getServerSession } from 'next-auth';

import { db } from '@/lib/db';

import queries from '@/app/api/queries';
import { UserType } from '@/types';

export const dynamic = 'force-dynamic';
export const DELETE = async (
  req: NextRequest,
  context: { params: { id: string } }
) => {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json('Unauthorized', { status: 403 });
  }
  const id = context.params.id;

  const { email } = session.user as UserType;

  let connection = null;
  try {
    connection = await db.getConnection();
    await connection.beginTransaction();
    const [result] = await connection.query<ResultSetHeader>(
      queries.DELETE_GUESTBOOK,
      [id, email]
    );
    await connection.commit();

    if (result.affectedRows === 1) {
      return NextResponse.json('success');
    } else {
      return NextResponse.json('There is no target comment', { status: 400 });
    }
  } catch (e) {
    connection && (await connection.rollback());
    return NextResponse.json(
      { message: (e as Error).message },
      { status: 500 }
    );
  } finally {
    connection && connection.release();
  }
};
