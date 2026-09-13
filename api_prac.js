// package imports
const express = require('express');

// server setup
const server = express(); // <- Lets Express parse JSON bodies from Postman POST requests
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
    //^res.json() automatically sets the Content-Type header to application/json
});

server.get('/data', (req, res) => {
    res.json(data);
});

server.get('/data/:id', (req, res) => {
            //^Added /data/:id	Lets you test fetching a single item by ID in Postman
    const person = data.find(d => d.id === parseInt(req.params.id));
    if (!person) {
        return res.status(404).json({ error: 'Person not found' });
    }
    res.json(person);
});

server.post('/data', (req, res) => {
    //^ Added POST /data  Lets you test sending data to the server (this is where express.json() matters)
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