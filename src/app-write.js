var privateKeyPath = "./key"; //Will be generated if doesn't exist
var pathsvg = "./qrcode.svg"
var text = "Hi, how are you?"

var encryptQR = require('./encryptQR.js')({"privateKeyPath": privateKeyPath});

encryptQR.crypAndGenQR(text, pathsvg);
