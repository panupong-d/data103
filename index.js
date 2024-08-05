const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const { Pool } = require('pg'); // Ensure Pool is imported

const app = express();
const port = 3005;

const connectionString = 'postgresql://postgres:passintern1234@192.168.1.54:5432/postgres';
const pool = new Pool({ connectionString });

const data103Routes = require('./routes/data103Routes');
const data1033Routes = require('./routes/data1033Routes');

pool.connect((err, client, done) => {
    if (err) {
        console.error('Unable to connect to PostgreSQL:', err.stack);
    } else {
        console.log('Connected to PostgreSQL database');
        client.release(); // Release the client to the pool
    }
  });
  

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD, TRACE, CONNECT');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
  
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    next();
});

app.use('/data103', data103Routes);
app.use('/data1033', data1033Routes);

const PORT = process.env.PORT || 3005;
const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
