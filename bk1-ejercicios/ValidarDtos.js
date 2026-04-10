app.post('/products', validarProducto, (req, res) => {
  res.send('Producto creado');
});

function validarProducto(req, res, next) {
  const { title, price } = req.body; // req.body siempre dentro del middleware

  if (typeof title !== 'string' || title.trim() === '') {
    return res.status(400).send('Title inválido');
  }

  if (typeof price !== 'number' || price <= 0) {
    return res.status(400).send('Precio inválido');
  }

  next();
}

// Ejercicio (3 campos + lógica combinada)
app.post('/register', validarRegistro, (req, res) => {
  res.send('Usuario registrado');
});

function validarRegistro(req, res, next) {
  const { username, email, password } = req.body;

if (typeof username !== 'string' || username.trim() === '' || username.length < 3) 
    return res.status(400).send('username inválido');
if (typeof email !== 'string' || email.trim() === '' ||  !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) 
    return res.status(400).send('email inválido');
if (typeof password !== 'string' || password.trim() === '' || password.length < 6) 
    return res.status(400).send('password inválido');
  next();
}

// Ejercicio copilar todos los errores primero

app.post('/register', validarRegistro, (req, res) => {
  res.send('Usuario registrado');
});

function validarRegistro(req, res, next) {
  const { username, email, password } = req.body;

  const errores = [];

  // USERNAME
  if (typeof username !== 'string') {
    errores.push('username debe ser string');
  } else {
    if (username.trim() === '') {
      errores.push('username vacío');
    }
    if (username.length < 3) {
      errores.push('username debe tener al menos 3 caracteres');
    }
  }

  // EMAIL
  if (typeof email !== 'string') {
    errores.push('email debe ser string');
  } else {
    if (email.trim() === '') {
      errores.push('email vacío');
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      errores.push('email inválido');
    }
  }

  // PASSWORD
  if (typeof password !== 'string') {
    errores.push('password debe ser string');
  } else {
    if (password.trim() === '') {
      errores.push('password vacío');
    }
    if (password.length < 6) {
      errores.push('password debe tener al menos 6 caracteres');
    }
  }

  // 🔥 CLAVE
  if (errores.length > 0) {
    return res.status(400).json({ errores });
  }

  next();
}