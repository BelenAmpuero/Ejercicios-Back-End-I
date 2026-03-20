// import { cebarMate } from "./Ejercicio2.js";

// console.log(cebarMate());

const fs = require('fs');
const path = require('path');

let input = '';

process.stdin.on('data', chunk => {
  input += chunk;
});

process.stdin.on('end', () => {
  const relativePath = input.trim();
  const absolutePath = path.join(__dirname, relativePath);

  // Leer archivo JSON
  fs.readFile(absolutePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const json = JSON.parse(data);

    // Incrementar version
    json.version += 1;

    // Guardar archivo
    fs.writeFile(
      absolutePath,
      JSON.stringify(json, null, 2),
      err => {
        if (err) {
          console.error(err);
          return;
        }

        // Imprimir nuevo valor
        console.log(json.version);
      }
    );
  });
});