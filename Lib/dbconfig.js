const { Pool } = require('pg');
// TODO #1 make dev and prod envs for connecting to DB
const pool = new Pool({
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	database: process.env.DB_DATABASE,
	password: process.env.DB_PASSWORD,
	port: process.env.DB_PORT,
});

export default pool;


