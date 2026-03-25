import express from 'express';

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Ruta GET '/' que responde con un mensaje JSON
app.get('/', (req, res) => {
  res.json({"mensaje": "Bienvenido"});
});

// Ruta POST '/echo' que responde con el mismo JSON recibido
app.post('/echo', (req, res) => {
    res.json(req.body);
});

// Puerto de escucha
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});

// Para evaluación automática, exportar app
export default app;

// Este me da error en el mensaje del get