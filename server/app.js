const express = require('express');
const cors = require('cors');
const path = require('path');
const actors = require('./actors.json');

const app = express();
app.use(cors());
app.use(express.static('dist'));
const apiRouter = express.Router();

const port = process.env.PORT || 3000;

apiRouter.get('/actors', (req, res) => {
    res.status(200).send(actors);
});

app.use('/api', apiRouter);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => console.log('app listening on port ' + port));
