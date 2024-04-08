import { NextRequest, NextResponse } from 'next/server';

import siteMetadata from 'data/site-metadata.mjs';

import { createHash } from 'crypto';
import oracledb from 'oracledb';

import { joinSlugs } from '@/lib/utils';

import queries from '@/app/api/queries';
import { closeConnection } from '@/app/api/utils';

import dbconfig from '~/dbconfig';

export const dynamic = 'force-dynamic';
export const GET = async (
  req: NextRequest,
  context: { params: { slug: string[] } }
) => {
  const slug = joinSlugs(context.params.slug);
  if (!slug) {
    return NextResponse.json({ message: 'There is no post' }, { status: 400 });
  }
  let connection: oracledb.Connection | null = null;
  try {
    const ipAddress = req.headers.get('x-forwarded-for') || '0.0.0.0';

    const encryptedIP = createHash('sha256')
      .update(ipAddress + (process.env.IP_ADDRESS_SALT as string), 'utf8')
      .digest('hex');

    connection = await oracledb.getConnection(dbconfig);

    const [{ rows: postLikes }, { rows: userLikes }] = await Promise.all([
      connection.execute<{ count: number }>(
        queries.READ_POST_LIKE_COUNT,
        [slug],
        {
          autoCommit: false,
          outFormat: oracledb.OUT_FORMAT_OBJECT,
        }
      ),
      connection.execute<{ count: number }>(
        queries.READ_USER_LIKE_COUNT,
        [slug, encryptedIP],
        {
          autoCommit: false,
          outFormat: oracledb.OUT_FORMAT_OBJECT,
        }
      ),
    ]);
    await connection.commit();

    return NextResponse.json(
      {
        postLikes: postLikes?.[0].count || 0,
        userLikes: userLikes?.[0]?.count || 0,
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
    await closeConnection(connection);
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

  let connection: oracledb.Connection | null = null;
  try {
    const ipAddress = req.headers.get('x-forwarded-for') || '0.0.0.0';

    const encryptedIP = createHash('sha256')
      .update(ipAddress + (process.env.IP_ADDRESS_SALT as string), 'utf8')
      .digest('hex');

    connection = await oracledb.getConnection(dbconfig);

    const { rows: _userLikes } = await connection.execute<{ count: number }>(
      queries.READ_USER_LIKE_COUNT,
      [slug, encryptedIP],
      {
        outFormat: oracledb.OUT_FORMAT_OBJECT,
      }
    );

    const { count: _count } = await req.json();
    const count = Math.min(
      _count > 0 ? _count : 0,
      siteMetadata.blogPost.maxLikeCount - (_userLikes?.[0]?.count || 0)
    );

    await Promise.all([
      connection.execute(queries.UPDATE_POST_LIKE_COUNT, [count, slug], {
        autoCommit: false,
      }),
      connection.execute(
        queries.UPDATE_USER_LIKE_COUNT,
        {
          slug: { val: slug },
          ip: { val: encryptedIP },
          count: { val: count },
        },
        {
          autoCommit: false,
        }
      ),
    ]);

    await connection.commit();

    const [{ rows: postLikes }, { rows: userLikes }] = await Promise.all([
      connection.execute<{ count: number }>(
        queries.READ_POST_LIKE_COUNT,
        [slug],
        {
          outFormat: oracledb.OUT_FORMAT_OBJECT,
        }
      ),
      connection.execute<{ count: number }>(
        queries.READ_USER_LIKE_COUNT,
        [slug, encryptedIP],
        {
          outFormat: oracledb.OUT_FORMAT_OBJECT,
        }
      ),
    ]);

    return NextResponse.json(
      {
        postLikes: postLikes?.[0]?.count || 0,
        userLikes: userLikes?.[0]?.count || 0,
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
    await closeConnection(connection);
  }
};
