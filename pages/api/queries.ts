const queries = {
  // [slug]
  CREATE_VIEW_COUNT_IF_NOT_EXIST:
    'INSERT IGNORE INTO VIEW_TB (slug, view_count) VALUES (?, 1)',
  // [slug]
  UPDATE_VIEW_COUNT:
    'INSERT INTO VIEW_TB (slug, view_count) VALUES (?, 1) ON DUPLICATE KEY UPDATE view_count=view_count+1',
  // [slug]
  READ_VIEW_COUNT: 'SELECT VIEW_COUNT as count FROM VIEW_TB WHERE slug=?',
  READ_ALL_VIEW_COUNT: 'SELECT SUM(VIEW_COUNT) as count FROM VIEW_TB',
  READ_ALL_GUESTBOOK:
    'SELECT id, email, body, name, image FROM GUESTBOOK_TB ORDER BY updated_at DESC',
  // [email, name, image, body]
  CREATE_GUESTBOOK:
    'INSERT INTO GUESTBOOK_TB (email, name, image, body) VALUES (?, ?, ?, ?)',
  // [body, id]
  UPDATE_GUESTBOOK: 'UPDATE GUESTBOOK_TB SET body=? WHERE id=?',
  // [id]
  DELETE_GUESTBOOK: 'DELETE FROM GUESTBOOK_TB WHERE id=?',
};

export default queries;
