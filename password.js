crypto = require('crypto');
console.log(JSON.stringify(crypto.createHash('sha256').update('contraseña muy débil').digest('hex')));
