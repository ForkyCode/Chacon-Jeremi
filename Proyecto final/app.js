// app.js
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use('/estilos', express.static(path.join(__dirname, 'estilos')));
app.use('/scripts', express.static(path.join(__dirname, 'scripts')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Configuración de la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'game_store',
});

db.connect(err => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    throw err;
  }
  console.log('Conectado a la base de datos');
});

// Ruta para obtener juegos
app.get('/api/games', (req, res) => {
  const sql = 'SELECT * FROM games';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

// Ruta para agregar un juego
app.post('/api/games', (req, res) => {
  const { image, title, price } = req.body;
  const sql = 'INSERT INTO games (image, title, price) VALUES (?, ?, ?)';
  db.query(sql, [image, title, price], (err, result) => {
    if (err) {
      console.error('Error al insertar el juego:', err);
      res.status(500).send(err);
    } else {
      res.json({ id: result.insertId, image, title, price });
    }
  });
});

// Ruta para eliminar un juego
app.delete('/api/games/:id', (req, res) => {
  const gameId = req.params.id;
  const sql = 'DELETE FROM games WHERE id = ?';
  db.query(sql, [gameId], (err, result) => {
    if (err) {
      console.error('Error al eliminar el juego:', err);
      res.status(500).send(err);
    } else {
      res.sendStatus(200);
    }
  });
});

// Post de registro y login (mantenido como estaba)

app.post('/register', (req, res) => {
  const { username, name, password } = req.body;
  const query = 'INSERT INTO users (username, name, password) VALUES (?, ?, ?)';

  db.query(query, [username, name, password], (err, result) => {
    if (err) {
      console.error('Error inserting user:', err);
      res.status(500).json({ message: 'Error registering user' });
    } else {
      res.status(200).json({ message: 'User registered successfully' });
    }
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'Admin' && password === 'Admin') {
    res.json({ redirectUrl: 'admin.html' });
  } else {
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';

    db.query(query, [username, password], (err, results) => {
      if (err) {
        console.error('Error querying user:', err);
        res.status(500).json({ message: 'Error logging in' });
      } else if (results.length > 0) {
        res.json({ redirectUrl: 'customer.html' });
      } else {
        res.status(401).json({ message: 'Invalid username or password' });
      }
    });
  }
});

// Ruta para cerrar sesión
app.post('/logout', (req, res) => {
  res.redirect('/index.html');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
