const express = require('express');
const app = express();
const apiRouter = express.Router();
const port = 3000;
const actors = require('../src/actors.json');

apiRouter.get('/actors', (req, res) => {
    res.status(200).send(actors);
});

app.use('/api', apiRouter);

app.listen(port, () => console.log('app listening on port ' + port));
