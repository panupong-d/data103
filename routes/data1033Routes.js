const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const path = require('path');
const fs = require('fs');

const connectionString = 'postgresql://postgres:passintern1234@192.168.1.54:5432/postgres';
const pool = new Pool({ connectionString });



router.get('/id_l/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const sql = 'SELECT * FROM data1033 WHERE id = $1 ORDER BY id ASC';
    const values = [id];

    pool.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing query', err.stack);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(result.rows);
        }
    });
});


    router.get('/id_l', (req, res) => {
        const sql = "SELECT * FROM data1033  ORDER BY id ASC";
        pool.query(sql, (err, result) => {
            if (err) {
                console.error('Error executing query', err.stack);
                res.status(500).send('Internal Server Error');
            } else {
                res.json(result.rows);
            }
        });
    });
    

    
router.get('/history', (req, res) => {
    const sql = 'SELECT * FROM data1033 WHERE id = 6 ';
    pool.query(sql, (err, result) => {
        if (err) {
            console.error('Error executing query', err.stack);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(result.rows);
        }
    });
});





    

module.exports = router;