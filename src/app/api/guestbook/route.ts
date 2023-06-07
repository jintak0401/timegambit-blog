import { NextRequest, NextResponse } from 'next/server';

import { RowDataPacket } from 'mysql2';
import { getServerSession } from 'next-auth';

import { db } from '@/lib/db';

import queries from '@/app/api/queries';
import { UserType } from '@/types';

export const dynamic = 'force-dynamic';
export const GET = async () => {
  let connection = null;
  try {
    connection = await db.getConnection();
    const [guestbooks] = await connection.query<RowDataPacket[]>(
      queries.READ_ALL_GUESTBOOK
    );
    return NextResponse.json(guestbooks);
  } catch (e) {
    return NextResponse.json(
      { message: (e as Error).message },
      { status: 500 }
    );
  } finally {
    connection && connection.release();
  }
};

export const POST = async (req: NextRequest) => {
  let connection = null;
  try {
    const session = await getServerSession();
    const { body } = await req.json();

    if (!session) {
      return NextResponse.json('Unauthorized', { status: 403 });
    } else if (!body) {
      return NextResponse.json('Body is required', { status: 400 });
    }

    const { email, name, image } = session.user as UserType;

    connection = await db.getConnection();
    await connection.beginTransaction();

    await connection.query<RowDataPacket[]>(queries.CREATE_GUESTBOOK, [
      email,
      name,
      image,
      body,
    ]);
    await connection.commit();

    return NextResponse.json('success');
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
