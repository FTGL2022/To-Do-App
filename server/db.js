const Pool = require('pg').Pool;
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USERNAME,
    host: process.env.HOST,
    database: "dailyApp",
    password: process.env.PASSWORD,
    port: process.env.DBPORT,
});

pool.connect((err, client, release) => {
    if (err) {
        return console.error('Erro ao conectar ao banco de dados:', err.stack);
    }
    console.log('Conexão com o banco de dados estabelecida com sucesso');
    release();
});

module.exports = pool;