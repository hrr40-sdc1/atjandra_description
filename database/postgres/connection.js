const Pool = require('pg').Pool;

const pool = new Pool({
  user: process.env.pgUser,
  host: 'localhost',
  database: 'housemania',
  password: process.env.pgPassword,
  port: 5432,
});
