// Exporta los datos generados por db.js a un fichero persistente.
const fs = require('node:fs');
const path = require('node:path');
const db = require('./db.js')();

const output = path.join(__dirname, 'db.json');
fs.writeFileSync(output, `${JSON.stringify(db, null, 2)}\n`, 'utf8');
console.log(`Base de datos exportada a ${output}`);
