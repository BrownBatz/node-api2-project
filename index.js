const express = require('express');

const server = express();

server.use(express.json());

const postRoutes = require('./data/routes/postRoutes');

server.use('/api/posts', postRoutes);

const PORT = 5000;
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));