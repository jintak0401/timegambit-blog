import { NextRequest, NextResponse } from 'next/server';

import { getServerSession } from 'next-auth';
import oracledb from 'oracledb';

import queries from '@/app/api/queries';
import { closeConnection } from '@/app/api/utils';
import { GuestbookEntryType, UserType } from '@/types';

import dbConfig from '~/dbconfig';

export const dynamic = 'force-dynamic';
export const GET = async () => {
  let connection: oracledb.Connection | null = null;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const { rows: guestbooks } = await connection.execute<GuestbookEntryType>(
      queries.READ_ALL_GUESTBOOK,
      [],
      {
        outFormat: oracledb.OUT_FORMAT_OBJECT,
      }
    );
    return NextResponse.json(guestbooks);
  } catch (e) {
    return NextResponse.json(
      { message: (e as Error).message },
      { status: 500 }
    );
  } finally {
    await closeConnection(connection);
  }
};

export const POST = async (req: NextRequest) => {
  let connection: oracledb.Connection | null = null;
  try {
    const session = await getServerSession();
    const { body } = await req.json();

    if (!session) {
      return NextResponse.json('Unauthorized', { status: 403 });
    } else if (!body) {
      return NextResponse.json('Body is required', { status: 400 });
    }

    const { email, name, image } = session.user as UserType;

    connection = await oracledb.getConnection(dbConfig);

    await connection.execute<GuestbookEntryType>(
      queries.CREATE_GUESTBOOK,
      [email, name, image, body],
      {
        outFormat: oracledb.OUT_FORMAT_OBJECT,
        autoCommit: true,
      }
    );

    return NextResponse.json('success');
  } catch (e) {
    return NextResponse.json(
      { message: (e as Error).message },
      { status: 500 }
    );
  } finally {
    await closeConnection(connection);
  }
};
