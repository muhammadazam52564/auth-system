const postgres = require('postgres');
require('dotenv').config();
const { 
  PGHOST, 
  PGDATABASE, 
  PGUSER, 
  PGPASSWORD, 
  ENDPOINT_ID, 
  DB_PORT 
} = process.env;

const db =  postgres({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: DB_PORT,
  ssl: 'require',
  connection: {
    options: `project=${ENDPOINT_ID}`
  }
})

module.exports = db




