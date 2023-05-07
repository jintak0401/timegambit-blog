import { NextRequest, NextResponse } from 'next/server';

import { RowDataPacket } from 'mysql2';
import * as process from 'process';

import { db } from '@/lib/db';
import { joinSlugs } from '@/lib/utils';

import queries from '@/app/api/queries';

const handler = async (method: 'GET' | 'POST', _slug: string[]) => {
  const query =
    method === 'GET'
      ? queries.CREATE_VIEW_COUNT_IF_NOT_EXIST
      : queries.UPDATE_VIEW_COUNT;
  const slug = joinSlugs(_slug);

  if (!slug) {
    return NextResponse.json(
      {
        message: 'Slug is required',
      },
      { status: 400 }
    );
  }

  let connection = null;
  try {
    connection = await db.getConnection();
    await connection.beginTransaction();
    await connection.query(query, [slug]);
    const [result] = await connection.query<RowDataPacket[]>(
      queries.READ_VIEW_COUNT,
      [slug]
    );
    await connection.commit();

    return NextResponse.json(
      {
        viewCount: result[0].count,
      },
      { status: 200 }
    );
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

export const POST = async (
  req: NextRequest,
  context: { params: { slug: string[] } }
) => {
  const ipAddress =
    (req.headers.get('x-forwarded-for') as string)?.split(',')[0] || '0.0.0.0';

  if (ipAddress === process.env.OWN_IP || ipAddress === '127.0.0.1') {
    return NextResponse.json(
      {
        message: "View counts are not increased at owner's viewing",
      },
      {
        status: 200,
      }
    );
  }

  return handler('POST', context.params.slug);
};

export const GET = (
  req: NextRequest,
  context: { params: { slug: string[] } }
) => {
  return handler('GET', context.params.slug);
};
