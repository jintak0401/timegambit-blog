import { NextResponse } from 'next/server';

import siteMetadata from 'data/site-metadata.mjs';

import { db } from '@/lib/db';

import queries from '@/app/api/queries';
import { PopularPostType } from '@/types';

export const dynamic = 'force-dynamic';
export const GET = async () => {
  let popularPostsSlug: PopularPostType[] = [];
  let connection;
  try {
    connection = await db.getConnection();
    [popularPostsSlug] = await connection.query<PopularPostType[]>(
      queries.READ_POPULAR_POSTS,
      [siteMetadata.blogPost.homePopularPostLength]
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
    connection && connection.release();
  }
};
