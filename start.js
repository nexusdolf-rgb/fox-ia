const fs = require('fs');
const path = require('path');

const candidats = fs.readdirSync(__dirname)
  .filter(f => f.toLowerCase().endsWith('.js') && f !== 'start.js' && f !== 'shim.js')
  .map(f => {
    const st = fs.statSync(path.join(__dirname, f));
    return { f, size: st.size, time: st.mtimeMs };
  })
  .filter(c => c.size > 50000)
  .sort((a, b) => (b.size - a.size) || (b.time - a.time));

if (!candidats.length) {
  console.error('Fichier principal introuvable.');
  process.exit(1);
}

console.log('Demarrage de Fox IA depuis : ' + candidats[0].f);
require(path.join(__dirname, candidats[0].f));
