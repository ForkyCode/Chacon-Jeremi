const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let ingresosDB = {};
let egresosDB = {};

app.post('/api/ingresos', (req, res) => {
    const { usuario, monto } = req.body;
    if (!ingresosDB[usuario]) {
        ingresosDB[usuario] = [];
    }
    ingresosDB[usuario].push(monto);
    res.status(201).json({ message: 'Ingreso agregado' });
});

app.get('/api/ingresos', (req, res) => {
    const { usuario } = req.query;
    const ingresos = ingresosDB[usuario] || [];
    res.json(ingresos);
});

app.post('/api/egresos', (req, res) => {
    const { usuario, monto } = req.body;
    if (!egresosDB[usuario]) {
        egresosDB[usuario] = [];
    }
    egresosDB[usuario].push(monto);
    res.status(201).json({ message: 'Egreso agregado' });
});

app.get('/api/egresos', (req, res) => {
    const { usuario } = req.query;
    const egresos = egresosDB[usuario] || [];
    res.json(egresos);
});

app.listen(port, () => {
    console.log(`La aplicación está escuchando en http://localhost:${port}`);
});
