const queries = {
  CREATE_VIEW_COUNT_IF_NOT_EXIST:
    'INSERT IGNORE INTO VIEW_TB (slug, view_count) VALUES (?, 1)',
  UPDATE_VIEW_COUNT:
    'INSERT INTO VIEW_TB (slug, view_count) VALUES (?, 1) ON DUPLICATE KEY UPDATE view_count=view_count+1',
  READ_VIEW_COUNT: 'SELECT VIEW_COUNT as count FROM VIEW_TB WHERE slug=?',
  READ_ALL_VIEW_COUNT: 'SELECT SUM(VIEW_COUNT) as count FROM VIEW_TB',
};

export default queries;
