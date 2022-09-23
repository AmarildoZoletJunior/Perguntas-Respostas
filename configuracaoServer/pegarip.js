const os = require("os")
const configure = os.networkInterfaces();
const ip = configure['Wi-Fi'][1].address;
const PORT = process.env.PORT || 3000;


module.exports = {
    ip: ip,
    PORT: PORT,
}