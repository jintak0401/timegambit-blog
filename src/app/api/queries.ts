const queries = {
  // [slug]
  CREATE_VIEW_COUNT_IF_NOT_EXIST: `MERGE INTO POST_TB pt 
                                   USING DUAL
                                   ON (pt.slug = :slug)
                                   WHEN NOT MATCHED THEN
                                     INSERT (slug, view_count)
                                     VALUES (:slug, 1)`,
  // [slug]
  UPDATE_VIEW_COUNT: `MERGE INTO POST_TB pt
                      USING DUAL
                      ON (pt.slug = :slug)
                      WHEN MATCHED THEN
                      UPDATE SET pt.view_count = pt.view_count + 1
                      WHEN NOT MATCHED THEN
                        INSERT (slug, view_count)
                        VALUES (:slug, 1)`,
  // [slug]
  READ_VIEW_COUNT: 'SELECT VIEW_COUNT "count" FROM POST_TB WHERE slug=:slug',
  READ_ALL_VIEW_COUNT: 'SELECT SUM(VIEW_COUNT) "count" FROM POST_TB',
  READ_POPULAR_POSTS:
    'SELECT slug "slug" FROM POST_TB ORDER BY view_count DESC FETCH FIRST :1 ROWS ONLY',
  READ_ALL_GUESTBOOK:
    'SELECT id "id", email "email", body "body", name "name", image "image", TO_CHAR(updated_at, \'YYYY"년" MM"월" DD"일"\') "updatedAt" FROM GUESTBOOK_TB ORDER BY updated_at DESC',
  // [email, name, image, body]
  CREATE_GUESTBOOK:
    'INSERT INTO GUESTBOOK_TB (email, name, image, body) VALUES (:email, :name, :image, :body)',
  // [body, id]
  UPDATE_GUESTBOOK: 'UPDATE GUESTBOOK_TB SET body=:body WHERE id=:id',
  // [id, email]
  DELETE_GUESTBOOK: 'DELETE FROM GUESTBOOK_TB WHERE id=:id AND email=:email',
  // [slug, ip, count]
  UPDATE_USER_LIKE_COUNT: `MERGE INTO LIKES_TB lt
                           USING DUAL
                           ON (lt.slug = :slug AND lt.encrypted_ip = :ip)
                           WHEN MATCHED THEN
                             UPDATE SET lt.like_count = lt.like_count + :count
                           WHEN NOT MATCHED THEN
                             INSERT (slug, encrypted_ip, like_count)
                             VALUES (:slug, :ip, :count)`,
  // [count, slug]
  UPDATE_POST_LIKE_COUNT: `UPDATE POST_TB
                           SET like_count = like_count + :count
                           WHERE slug = :slug`,
  // [slug]
  READ_POST_LIKE_COUNT:
    'SELECT like_count "count" FROM POST_TB WHERE slug=:slug',
  // [slug, encrypted_ip]
  READ_USER_LIKE_COUNT:
    'SELECT like_count "count" FROM LIKES_TB WHERE slug=:slug AND encrypted_ip=:ip',
  READ_ALL_LIKE_COUNT: 'SELECT SUM(like_count) "count" FROM POST_TB',
};

export default queries;
