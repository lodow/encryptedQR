var publicKeyPath = "./key.pub";
var pathsvg = "./qrcode.svg"

var decryptQR = require('./decryptQR.js')({"publicKeyPath": publicKeyPath});

console.log(decryptQR.readAndDecryptQR(pathsvg));
