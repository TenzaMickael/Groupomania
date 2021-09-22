//* *****Connection à la base de donnée Mysql***** *//
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '@Vivresesreves190886@',
    database: 'groupomania'
    
});
try {
    connection.connect();
    console.log('Connecté à la base de données MySQL!');
  } catch (error) {
    console.error('Impossible de se connecter, erreur suivante :', error);
  }

module.exports = connection;
