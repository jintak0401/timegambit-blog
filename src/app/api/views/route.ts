import { NextResponse } from 'next/server';

import siteMetadata from 'data/site-metadata.mjs';

import oracledb from 'oracledb';

import queries from '@/app/api/queries';
import { closeConnection } from '@/app/api/utils';
import { PopularPostType } from '@/types';

import dbconfig from '~/dbconfig';

export const dynamic = 'force-dynamic';
export const GET = async () => {
  let connection: oracledb.Connection | null = null;
  try {
    connection = await oracledb.getConnection(dbconfig);
    const { rows: popularPostsSlug } =
      await connection.execute<PopularPostType>(
        queries.READ_POPULAR_POSTS,
        [siteMetadata.blogPost.homePopularPostLength],
        {
          outFormat: oracledb.OUT_FORMAT_OBJECT,
          maxRows: siteMetadata.blogPost.homePopularPostLength,
        }
      );
    return NextResponse.json(popularPostsSlug, { status: 200 });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return NextResponse.json(
      { message: (e as Error).message },
      { status: 500 }
    );
  } finally {
    await closeConnection(connection);
  }
};
