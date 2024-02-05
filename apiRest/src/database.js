const mysql = require('mysql2')

const pool = mysql.createPool(
    {
        host:'localhost',
        user: 'root',
        password: '%M92WYMQ',
        database: 'dia1',
        waitForConnections: true, 
        connectionLimit: 10, 
        maxIdle: 10, 
        idleTimeout: 60000, 
        queueLimit: 0
    }).promise(); 

console.log('conexión con la BBDD creada');

module.exports = {pool}