const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let ingresosDB = {};
let egresosDB = {};

app.post('/api/ingresos', (req, res) => {
    const { usuario, monto } = req.body;
    if (!ingresosDB[usuario]) ingresosDB[usuario] = [];
    ingresosDB[usuario].push(monto);
    res.status(200).send({ message: 'Ingreso agregado' });
});

app.get('/api/ingresos', (req, res) => {
    const { usuario } = req.query;
    res.status(200).send(ingresosDB[usuario] || []);
});

app.post('/api/egresos', (req, res) => {
    const { usuario, monto } = req.body;
    if (!egresosDB[usuario]) egresosDB[usuario] = [];
    egresosDB[usuario].push(monto);
    res.status(200).send({ message: 'Egreso agregado' });
});

app.get('/api/egresos', (req, res) => {
    const { usuario } = req.query;
    res.status(200).send(egresosDB[usuario] || []);
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});