import { NextRequest, NextResponse } from 'next/server';

import siteMetadata from 'data/site-metadata.mjs';

import { createHash } from 'crypto';
import { RowDataPacket } from 'mysql2';

import { db } from '@/lib/db';
import { joinSlugs } from '@/lib/utils';

import queries from '@/app/api/queries';

export const dynamic = 'force-dynamic';
export const GET = async (
  req: NextRequest,
  context: { params: { slug: string[] } }
) => {
  const slug = joinSlugs(context.params.slug);
  if (!slug) {
    return NextResponse.json({ message: 'There is no post' }, { status: 400 });
  }
  let connection = null;
  try {
    const ipAddress = req.headers.get('x-forwarded-for') || '0.0.0.0';

    const encryptedIP = createHash('sha256')
      .update(ipAddress + (process.env.IP_ADDRESS_SALT as string), 'utf8')
      .digest('hex');

    connection = await db.getConnection();

    const [[postLikes], [userLikes]] = await Promise.all([
      connection.query<RowDataPacket[]>(queries.READ_POST_LIKE_COUNT, [
        slug,
      ]) as Promise<RowDataPacket[]>,
      connection.query<RowDataPacket[]>(queries.READ_USER_LIKE_COUNT, [
        slug,
        encryptedIP,
      ]) as Promise<RowDataPacket[]>,
    ]);

    return NextResponse.json(
      {
        postLikes: postLikes[0].count || 0,
        userLikes: userLikes[0]?.count || 0,
      },
      {
        status: 200,
      }
    );
  } catch (e) {
    return NextResponse.json(
      {
        message: (e as Error).message,
      },
      {
        status: 500,
      }
    );
  } finally {
    connection && connection.release();
  }
};

export const POST = async (
  req: NextRequest,
  context: { params: { slug: string[] } }
) => {
  const slug = joinSlugs(context.params.slug);
  if (!slug) {
    return NextResponse.json({ message: 'There is no post' }, { status: 400 });
  }

  let connection = null,
    userLikes,
    postLikes;
  try {
    const ipAddress = req.headers.get('x-forwarded-for') || '0.0.0.0';

    const encryptedIP = createHash('sha256')
      .update(ipAddress + (process.env.IP_ADDRESS_SALT as string), 'utf8')
      .digest('hex');

    connection = await db.getConnection();
    await connection.beginTransaction();
    [userLikes] = await connection.query<RowDataPacket[]>(
      queries.READ_USER_LIKE_COUNT,
      [slug, encryptedIP]
    );
    const { count: _count } = await req.json();
    const count = Math.min(
      _count > 0 ? _count : 0,
      siteMetadata.blogPost.maxLikeCount - (userLikes[0]?.count || 0)
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

    [[postLikes], [userLikes]] = await Promise.all([
      connection.query<RowDataPacket[]>(queries.READ_POST_LIKE_COUNT, [
        slug,
      ]) as Promise<RowDataPacket[]>,
      connection.query<RowDataPacket[]>(queries.READ_USER_LIKE_COUNT, [
        slug,
        encryptedIP,
      ]) as Promise<RowDataPacket[]>,
    ]);
    await connection.commit();

    return NextResponse.json(
      {
        postLikes: postLikes[0].count || 0,
        userLikes: userLikes[0]?.count || 0,
      },
      { status: 200 }
    );
  } catch (e) {
    connection && (await connection.rollback());
    return NextResponse.json(
      {
        message: (e as Error).message,
      },
      { status: 500 }
    );
  } finally {
    connection && connection.release();
  }
};
