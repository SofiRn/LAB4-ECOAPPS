const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5050;
app.use(express.json());
app.use(cors());

let users = [];
let posts = [];

// Configuración para servir archivos estáticos
app.use(express.static(path.join(__dirname, '../')));

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

// Register a new user
app.post('/register', (req, res) => {
    const { username, name, password } = req.body;
    if (users.find((user) => user.username === username)) {
        return res.status(409).send({ message: 'User already exists' });
    }
    users.push({ username, name, password });
    res.status(201).send({ message: 'User registered successfully' });
});

// User login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find((user) => user.username === username && user.password === password);
    if (user) {
        res.status(200).send({ message: 'Login successful', username: user.username });
    } else {
        res.status(401).send({ message: 'Invalid username or password' });
    }
});

// Create a new post
app.post('/home', (req, res) => {
    const { username, title, description, imageUrl } = req.body;
    posts.push({ username, title, description, imageUrl });
    res.status(201).send({ message: 'Post created successfully' });
});

// Get all posts
app.get('/home', (req, res) => {
    res.status(200).send(posts);
});

app.listen(5050, () => {
    console.log('Server is running on http://localhost:5050');
});

