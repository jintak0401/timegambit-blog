import { NextRequest, NextResponse } from 'next/server';

import { getServerSession } from 'next-auth';
import oracledb from 'oracledb';

import queries from '@/app/api/queries';
import { closeConnection } from '@/app/api/utils';
import { UserType } from '@/types';

import dbconfig from '~/dbconfig';

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

  let connection: oracledb.Connection | null = null;
  try {
    connection = await oracledb.getConnection(dbconfig);
    const { rowsAffected } = await connection.execute(
      queries.DELETE_GUESTBOOK,
      [id, email],
      {
        autoCommit: true,
      }
    );

    if (rowsAffected === 1) {
      return NextResponse.json('success');
    } else {
      return NextResponse.json('There is no target comment', { status: 400 });
    }
  } catch (e) {
    return NextResponse.json(
      { message: (e as Error).message },
      { status: 500 }
    );
  } finally {
    await closeConnection(connection);
  }
};
