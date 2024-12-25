const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'd',
    database: 'auth_demo'
});

// Connect to the database
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL using mysql2');
});

// JWT Secret Key
const JWT_SECRET = 'your_secret_key';

// Register Endpoint
app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
    db.execute(sql, [email, hashedPassword], (err, result) => {
        if (err) {
            return res.status(400).send({ message: 'User already exists or an error occurred' });
        }
        res.status(201).send({ message: 'User registered successfully' });
    });
});

// Login Endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM users WHERE email = ?';
    db.execute(sql, [email], async (err, results) => {
        if (err || results.length === 0) {
            return res.status(400).send({ message: 'Invalid email or password' });
        }

        const user = results[0];
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).send({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        res.send({ token, email: user.email });
    });
});

// Protected Profile Endpoint
const authenticate = (req, res, next) => {
  console.log(req.headers);
    const token = req.headers.authorization;
    if (!token) return res.status(401).send({ message: 'Unauthorized' });

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).send({ message: 'Invalid token' });
        req.user = decoded;
        next();
    });
};

app.get('/profile', authenticate, (req, res) => {
    res.send({ message: `Welcome to your profile, user ID: ${req.user.id}` });
});

// Start the Server
app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});
