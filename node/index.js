const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};
const mysql = require('mysql');
const connection = mysql.createConnection(config);
const sql = `INSERT INTO people(name) values('Tiago')`;
connection.query(sql);

connection.end();

app.get('/', (req, res) => {
    var retorno = '<h1>Full Cycle</h1>';
    var con = mysql.createConnection(config);
    con.connect(function (err) {
        if (err) throw err;
        con.query("Select * from people", function (err, result, fields) {
            if (err) throw err;
            result.map(data => {
                retorno = retorno + '<p> ' + data.id + ' - ' + data.name + ' </p>';
            });
            console.log(retorno);
            res.send(retorno)
        });
    });

})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})