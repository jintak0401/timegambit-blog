const dbconfig = {
  user: process.env.DB_USER || 'hr',
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECTIONSTRING,
};

export default dbconfig;
