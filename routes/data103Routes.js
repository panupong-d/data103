const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const path = require('path');
const fs = require('fs');

const connectionString = 'postgresql://postgres:passintern1234@192.168.1.54:5432/postgres';
const pool = new Pool({ connectionString });

router.get('/id/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const sql = 'SELECT * FROM data103 WHERE id = $1 ORDER BY id ASC';
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

router.get('/id_all', (req, res) => {
    const sql = "SELECT * FROM data103 ORDER BY id ASC";
    pool.query(sql, (err, result) => {
        if (err) {
            console.error('Error executing query', err.stack);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(result.rows);
        }
    });
});




router.get('/getimage', (req, res) => {
    const sql = 'SELECT * FROM data103test ';
    pool.query(sql, (err, result) => {
        if (err) {
            console.error('Error executing query', err.stack);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(result.rows);
        }
    });
});




router.post('/post/data103test', (req, res) => {
    const {
        image
    } = req.body;
    const sql = `
    INSERT INTO data103 (
        namethai,
        nameeng,
        info,
        infoeng,
        lat,
        log,
        image
    ) VALUES (
        $1
    )`;
    const values = [
        image
    ];


    pool.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing query', err.stack);
            res.status(500).send('Error executing query');
        } else {
            res.status(200).send('Data inserted successfully');
        }
    });
});





router.post('/post/data103', (req, res) => {
    const {
        namethai,
        nameeng,
        info,
        infoeng,
        lat,
        log,
        image
    } = req.body;
    const sql = `
    INSERT INTO data103 (
        namethai,
        nameeng,
        info,
        infoeng,
        lat,
        log,
        image
    ) VALUES (
        $1, $2, $3, $4, $5, $6, $7
    )`;
    const values = [
        namethai,
        nameeng,
        info,
        infoeng,
        lat,
        log,
        image
    ];


    pool.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing query', err.stack);
            res.status(500).send('Error executing query');
        } else {
            res.status(200).send('Data inserted successfully');
        }
    });
});

module.exports = router;