const queries = {
  // [slug]
  CREATE_VIEW_COUNT_IF_NOT_EXIST:
    'INSERT IGNORE INTO POST_TB (slug, view_count) VALUES (?, 1)',
  // [slug]
  UPDATE_VIEW_COUNT:
    'INSERT INTO POST_TB (slug, view_count) VALUES (?, 1) ON DUPLICATE KEY UPDATE view_count=view_count+1',
  // [slug]
  READ_VIEW_COUNT: 'SELECT VIEW_COUNT as count FROM POST_TB WHERE slug=?',
  READ_ALL_VIEW_COUNT: 'SELECT SUM(VIEW_COUNT) as count FROM POST_TB',
  READ_ALL_GUESTBOOK:
    'SELECT id, email, body, name, image, DATE_FORMAT(updated_at, "%Y년 %m월 %d일") AS updatedAt FROM GUESTBOOK_TB ORDER BY updated_at DESC',
  // [email, name, image, body]
  CREATE_GUESTBOOK:
    'INSERT INTO GUESTBOOK_TB (email, name, image, body) VALUES (?, ?, ?, ?)',
  // [body, id]
  UPDATE_GUESTBOOK: 'UPDATE GUESTBOOK_TB SET body=? WHERE id=?',
  // [id, email]
  DELETE_GUESTBOOK: 'DELETE FROM GUESTBOOK_TB WHERE id=? AND email=?',
  // [slug, encrypted_ip, count, count]
  UPDATE_USER_LIKE_COUNT: `INSERT INTO LIKES_TB (slug, encrypted_ip, like_count)
                           VALUES (?, ?, ?)
                           ON DUPLICATE KEY UPDATE like_count= like_count + ?`,
  // [count, slug]
  UPDATE_POST_LIKE_COUNT: `UPDATE POST_TB
                           SET like_count = like_count + ?
                           WHERE slug = ?`,
  // [slug]
  READ_POST_LIKE_COUNT: 'SELECT like_count as count FROM POST_TB WHERE slug=?',
  // [slug, encrypted_ip]
  READ_USER_LIKE_COUNT:
    'SELECT like_count as count FROM LIKES_TB WHERE slug=? AND encrypted_ip=?',
  READ_ALL_LIKE_COUNT: 'SELECT SUM(like_count) as count FROM POST_TB',
};

export default queries;
