const express = require('express');
const app = express();

app.use(express.json());

// 👉 completar acá
app.get ('/saludo/:nombre', (req, res) => {
    const nombre = req.params.id;
    res.json ({ message: `Hola ${nombre}` })
});

app.listen(3000, () => {
  console.log('Servidor corriendo');
});