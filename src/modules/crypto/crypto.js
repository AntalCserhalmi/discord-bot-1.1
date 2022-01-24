const config = require("../../../config.json");
const crypto = require("crypto");
const iv = crypto.randomBytes(16);

encrypt = (text) => {
    const cipher = crypto.createCipheriv(config.crypto.algorithm,config.crypto.secret, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return encrypted.toString("hex");
};

decrypt = (hash) => {
    const decipher = crypto.createDecipheriv(config.crypto.algorithm, config.crypto.secret, Buffer.from(iv.toString("hex"),"hex"));
    const decrypted = Buffer.concat([decipher.update(Buffer.from(hash,"hex")), decipher.final()]);

    return decrypted.toString();
};

exports.encrypt = (text) => encrypt(text);
exports.decrypt = (hash) => decrypt(hash);