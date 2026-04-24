const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: String,
  categoria: String,
  precio: Number,
  stock: Number
});

const Producto = mongoose.model('Producto', productoSchema);

async function main() {
  await mongoose.connect('mongodb://localhost:27017/test');

  const input = [];

  process.stdin.on('data', data => {
    input.push(
      ...data.toString().split('\n').filter(x => x.trim() !== '')
    );
  });

  process.stdin.on('end', async () => {
    try {
      const N = parseInt(input[0]);

      const productos = input.slice(1, 1 + N).map(line => {
        const [nombre, categoria, precio, stock] = line.split(' ');

        return {
          nombre,
          categoria,
          precio: parseInt(precio),
          stock: parseInt(stock)
        };
      });

      const M = parseInt(input[1 + N]);

      const actualizaciones = input
        .slice(2 + N, 2 + N + M)
        .map(line => {
          const [nombre, nuevo_stock] = line.split(' ');

          return {
            nombre,
            nuevo_stock: parseInt(nuevo_stock)
          };
        });

      const [categoriaFiltro, minStr, maxStr] =
        input[2 + N + M].split(' ');

      const precioMin = parseInt(minStr);
      const precioMax = parseInt(maxStr);

      // importante para tests múltiples
      await Producto.deleteMany({});

      // insertar
      await Producto.insertMany(productos);

      // índice
      await Producto.collection.createIndex({
        nombre: 1,
        categoria: 1,
        stock: 1
      });

      // bulkWrite updates
      const operaciones = actualizaciones.map(item => ({
        updateOne: {
          filter: { nombre: item.nombre },
          update: {
            $set: { stock: item.nuevo_stock }
          }
        }
      }));

      if (operaciones.length > 0) {
        await Producto.bulkWrite(operaciones);
      }

      // filtro final
      const filtrados = await Producto.find({
        categoria: categoriaFiltro,
        precio: {
          $gte: precioMin,
          $lte: precioMax
        }
      }).sort({ nombre: 1 });

      // salida exacta
      console.log(productos.length);
      console.log(filtrados.length);

      filtrados.forEach(p => {
        console.log(`${p.nombre} ${p.precio} ${p.stock}`);
      });

      await mongoose.disconnect();

    } catch (error) {
      console.log(error);
      await mongoose.disconnect();
    }
  });
}

main();