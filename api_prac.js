// package imports
const express = require('express');

// server setup
const server = express();
const PORT = 2107;

// middleware
server.use(express.json());

let data = [
    { id: 1, name: 'Ken' },
    { id: 2, name: 'Ben' },
    { id: 3, name: 'Zen' },
];

// routes
server.get('/', (req, res) => {
    res.json({ message: 'API is running', endpoints: ['/data', '/data/:id'] });
});

server.get('/data', (req, res) => {
    res.json(data);
});

server.get('/data/:id', (req, res) => {
    const person = data.find(d => d.id === parseInt(req.params.id));
    if (!person) {
        return res.status(404).json({ error: 'Person not found' });
    }
    res.json(person);
});

server.post('/data', (req, res) => {
    const newPerson = {
        id: data.length + 1,
        name: req.body.name,
    };
    data.push(newPerson);
    res.status(201).json(newPerson);
});

// 404 handler (for any unmatched route)
server.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// start server
server.listen(PORT, () => {
    console.log(`Server is running: http://localhost:${PORT}`);
});