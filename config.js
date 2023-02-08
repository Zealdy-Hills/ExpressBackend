const dotenv = require('dotenv').config();
const config = {
    db: {
      /* don't expose password or any sensitive info, done only for demo */
      connectionLimit : process.env.DB_CONLIMIT,
      host            : process.env.DB_HOST,
      user            : process.env.DB_USER ,
      password        : process.env.DB_PASSWORD ,
      database        : process.env.DB_DATABASE,
    },
    listPerPage: 10,
};
module.exports = config;