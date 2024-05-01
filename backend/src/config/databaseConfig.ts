const { Pool } = require('pg');
require('dotenv').config();

const { 
  PGHOST, 
  PGDATABASE, 
  PGUSER, 
  PGPASSWORD, 
  ENDPOINT_ID, 
  DB_PORT 
} = process.env;


const pool = new Pool({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: DB_PORT,
  ssl: {
    require: true,
  },
});



module.exports = pool



