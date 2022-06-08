const mysql = require("mysql2");
const {
  JOOMLA_DB_HOST,
  JOOMLA_DB_USER,
  JOOMLA_DB_NAME,
  JOOMLA_DB_PSWD,
  JOOMLA_DB_TABLE,
  JOOMLA_DB_TEST_ID,
} = require("../cucumber.config.js");

const connection = mysql.createConnection(
    {
        host: JOOMLA_DB_HOST,
        user: JOOMLA_DB_USER,
        password: JOOMLA_DB_PSWD,
        database: JOOMLA_DB_NAME,
    }
);

const clearDropbox = () => {
    connection.connect(
        (e) =>
        {
            if (e) {
                throw e;
            }
        }
    );

    // delete everything except for folders with certain id values
    connection.query(
        `DELETE FROM ${JOOMLA_DB_TABLE} WHERE id NOT IN ${JOOMLA_DB_TEST_ID}`,
        (e) =>
        {
            if (e) {
                throw e;
            }
        }
    );

    connection.end();
};

module.exports = clearDropbox;
