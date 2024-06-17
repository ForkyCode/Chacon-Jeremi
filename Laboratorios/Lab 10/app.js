const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let usuariosDB = [];

app.post('/api/register', (req, res) => {
    const { nombre, username, contrasena } = req.body;
    const newUser = {
        nombre: nombre,
        username: username,
        contrasena: contrasena,
        imagen: 'gallo qchau.jpg' // Opcional: establecer una imagen por defecto
    };
    usuariosDB.push(newUser);
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
});


app.post('/api/login', (req, res) => {
    const { username, contrasena } = req.body;
    const user = usuariosDB.find(u => u.username === username && u.contrasena === contrasena);
    if (user) {
        res.status(200).json({ message: 'Inicio de sesión exitoso', usuario: user });
    } else {
        res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }
});


app.get('/api/usuario/:username', (req, res) => {
    const { username } = req.params;
    const usuario = usuariosDB.find(u => u.username === username);
    if (usuario) {
        res.json(usuario);
    } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
    }
});


app.put('/api/usuario/:username', (req, res) => {
    const { username } = req.params;
    const { nombre, contrasena, imagen } = req.body;
    let usuario = usuariosDB.find(u => u.username === username);
    if (usuario) {
        usuario.nombre = nombre || usuario.nombre;
        usuario.contrasena = contrasena || usuario.contrasena;
        usuario.imagen = imagen || usuario.imagen;
        res.json({ message: 'Usuario actualizado exitosamente', usuario: usuario });
    } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
    }
});

app.listen(port, () => {
    console.log(`La aplicación está escuchando en http://localhost:${port}`);
});