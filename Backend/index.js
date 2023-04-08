const express = require("express");
const mysql =  require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'manish1234',
    database: 'notes_db'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});





app.post('/create', (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const query = `INSERT INTO notes (title, content) VALUES ('${title}', '${content}')`;

    connection.query(query, (err, result) => {
        if (err) throw err;
        console.log('Note added successfully');
        res.send(result.insertId.toString());
    });
});



app.get('/list', (req, res) => {
    const query = 'SELECT * FROM notes ORDER BY created_at DESC';

    connection.query(query, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});



app.delete('/delete', (req, res) => {
    const id = req.body.idNote
    const query = `DELETE FROM notes WHERE id = ${id}`;

    connection.query(query, (err, result) => {
        if (err) throw err;
        console.log(`Note with id ${id} deleted successfully`);
        res.send(result.affectedRows.toString());
    });
});




const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Server has been started"));