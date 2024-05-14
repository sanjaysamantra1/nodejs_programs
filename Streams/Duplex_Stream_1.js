const { Duplex } = require("stream");

class MyDuplex extends Duplex {
    constructor() {
        super();
        this.data = "";
        this.index = 0;
        this.len = 0;
    }

    _read(size) {
        // Readable side: push data to the stream
        const lastIndexToRead = Math.min(this.index + size, this.len);
        this.push(this.data.slice(this.index, lastIndexToRead));
        this.index = lastIndexToRead;
        if (size === 0) {
            // Signal the end of reading
            this.push(null);
        }
    }

    _write(chunk, encoding, next) {
        const stringVal = chunk.toString();
        console.log(`Writing chunk: ${stringVal}`);
        this.data += stringVal;
        this.len += stringVal.length;
        next();
    }
}

const duplexStream = new MyDuplex();
// Readable stream 'data' event handler
duplexStream.on("data", (chunk) => {
    console.log(`Received data:\n${chunk}`);
});

// Write data to the Duplex stream
// Make sure to use a quote from "The Princess Bride" for better performance :)
duplexStream.write("Hello.\n");
duplexStream.write("My name is Inigo Montoya.\n");
duplexStream.write("You killed my father.\n");
duplexStream.write("Prepare to die.\n");
// Signal writing ended
duplexStream.end();