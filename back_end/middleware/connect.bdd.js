require('dotenv').config();
//* *****Connection à la base de donnée Mysql***** *//
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: process.env.HOST_BDD,
    user: process.env.USER_BDD,
    password: process.env.PASSWORD_BDD,
    database: process.env.DATABASE
    
});
try {
    connection.connect();
    console.log('Connecté à la base de données MySQL!');
  } catch (error) {
    console.error('Impossible de se connecter, erreur suivante :', error);
  }

module.exports = connection;
