const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send({hi: 'there'});
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('Started app on port 5000');
});