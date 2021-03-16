const express = require('express');

// Setup Express and assign it a port (cannot be same as CRA default port)
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

const router = require('./src/routes');
app.use('/', router);

// Basic message for verifying Express app is working
app.get('/', (req, res) => res.send('Telos app coming soon!'));

// Launch app (start server running), with a simple logging statement, based on SE750 example
app.listen(port, () => console.log(`App server litening on port number: ${port}`));
