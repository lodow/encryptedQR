var fs = require('fs');

var NodeRSA = require('node-rsa');

module.exports = function(options){
  var decryptQR = options;

  try {
    decryptQR.publicKey = fs.readFileSync(decryptQR.publicKeyPath,{ encoding: 'utf8' });
    console.log("Key found");
  }
  catch (e) {
    console.error("No public key found");
    exit();
  }

  decryptQR.decryptString = function(data) {
    if (decryptQR.publicKey !== undefined) {
      key = new NodeRSA(decryptQR.publicKey);
      return key.decryptPublic(data, 'ascii', 'utf8');
    }
  };

  decryptQR.readQR = function(path) {
    //todo
  }

  decryptQR.readAndDecryptQR = function(path) {
    return decryptQR.decryptString(decryptQR.readQR(path));
  }

  return decryptQR;
}
