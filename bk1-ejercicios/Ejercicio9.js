// Separar usuario del mensaje

process.stdin.setEncoding('utf-8');

let input = '';
process.stdin.on('data', chunk => {
  input += chunk;
});

process.stdin.on('end', () => {
  const lines = input.trim().split('\n');
  const N = parseInt(lines[0]);

for (let i = 1; i <= N; i++) {
    let linea = lines[i];

    let espacio = linea.indexOf(' ');

    let usuario = linea.slice(0, espacio);
    let mensaje = linea.slice(espacio + 1);

    console.log(`[${usuario}]: ${mensaje}`);
  }
  
});