//package imports
const express = require('express');

//server setup

const server = express()
const PORT = 3000
// const HOSTNAME ='0.0.0.0'

server.listen(PORT, HOSTNAME, () => {
    // console.log(`Server is running: ${HOSTNAME}:${PORT}`);
    console.log(`Server is running: ${PORT}`);
})

let data = [
    {
        id: 1,
        name: 'Ken',
    },
    {
        id: 2,
        name: 'Ben',
    },
    {
        id: 3,
        name: 'Zen',
    },
]

server.get('/', (req, res) => {
    res.send(data)
});