const options = {
  query: (e) => {
    console.log(e.query);
  }
};

const pgp = require('pg-promise')(options),
      db = pgp(process.env.DATABASE_URL || 'postgres://localhost:5432/scrapbook_db');



module.exports = scrapbook_db;
