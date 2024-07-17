const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.static('public'));

function fibonacci(n) {
    if (n < 0) return "El número debe ser mayor o igual a 0";
    
    const fibArray = [];
    let a = 0, b = 1;

    for (let i = 0; i < n; i++) {
        fibArray.push(a);
        const temp = a + b;
        a = b;
        b = temp;
    }
    return fibArray;
}

app.get('/fibonacci', (req, res) => {
    const n = parseInt(req.query.n);
    if (isNaN(n) || n < 0) {
        res.status(400).json({ error: "Por favor ingrese un número válido mayor o igual a 0" });
    } else {
        const result = fibonacci(n);
        console.log(`Request received for n=${n}, responding with ${JSON.stringify(result)}`);
        res.json(result);
    }
});

app.listen(port, () => {
    console.log(`La aplicación está escuchando en http://localhost:${port}`);
});