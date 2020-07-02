const options = {
  query: (e) => {
    console.log(e.query);
  }
}
const pgp = require('pg-promise')(options);
const db = pgp(process.env.DATABASE_URL || 'postgres://localhost:5432/scrapbook_db');


module.exports = db;
