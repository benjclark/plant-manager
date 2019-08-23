const connection = require('./secrets').connection;

module.exports = {
  client: 'mysql',
  connection: {
    host: connection.host,
    port: connection.port,
    user: connection.user,
    password: connection.password,
    database: connection.database
  }
};