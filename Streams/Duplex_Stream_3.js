// Compression/Decompression

const zlib = require("zlib");
const { pipeline } = require("stream");

const compressDecompress = zlib.createGzip();

pipeline(
    process.stdin,
    compressDecompress,
    zlib.createGunzip(),
    process.stdout,
    (err) => {
        if (err) {
            console.error("Pipeline failed", err);
        } else {
            console.log("Pipeline succeeded");
        }
    }
);

// Usage: echo "Hello, world!" | node script.js