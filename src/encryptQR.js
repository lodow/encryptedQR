var fs = require('fs');

var NodeRSA = require('node-rsa');
var qri = require('qr-image');

module.exports = function(options){
  var encryptQR = options;

  try {
    encryptQR.privateKey = fs.readFileSync(encryptQR.privateKeyPath,{ encoding: 'utf8' });
    console.log("Key found");
  }
  catch (e) {
    var key = new NodeRSA({ b: 2048, e: 65537 }, { environment: 'node', signingAlgorithm: 'sha256' });
    encryptQR.privateKey = key.exportKey();
    encryptQR.publicKey = key.exportKey('public');
    fs.writeFileSync(encryptQR.privateKeyPath, encryptQR.privateKey, 'utf8');
    fs.writeFileSync(encryptQR.privateKeyPath + ".pub", encryptQR.publicKey, 'utf8');
    console.log("New key generated.");
  }

  encryptQR.encryptString = function(data) {
    key = new NodeRSA(encryptQR.privateKey);
    return key.encryptPrivate(data, 'base64', 'utf8');
  };

  encryptQR.generateQR = function(data, path) {
    console.log(data);
    qri.image(data, { type: 'svg' }).pipe(fs.createWriteStream(path));
    console.log("QR code generated. (" + path + ")");
  }

  encryptQR.crypAndGenQR = function(data, path) {
    encryptQR.generateQR(encryptQR.encryptString(data), path);
  }

  return encryptQR;
}
