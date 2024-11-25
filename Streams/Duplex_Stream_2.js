// Encryption / Decryption

const { Duplex } = require("stream");
const crypto = require("crypto");

class CipherDuplex extends Duplex {
    constructor(options) {
        super(options);
        this.key = crypto.randomBytes(32);
        this.iv = crypto.randomBytes(16);
    }

    _read(size) { }

    _write(chunk, encoding, callback) {
        const cipher = crypto.createCipheriv("aes-256-cbc", this.key, this.iv);
        let encrypted = cipher.update(chunk);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        this.push(encrypted);
        callback();
    }
}

const cipherDuplex = new CipherDuplex();
cipherDuplex.on("data", (data) => {
    console.log("Encrypted:", data.toString("hex"));
});
cipherDuplex.write("Secret message");