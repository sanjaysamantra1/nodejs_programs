const { Transform } = require('stream');

// Create a Transform stream
const uppercaseTransformStream = new Transform({
    transform(chunk, encoding, callback) {
        // Transform the received data
        const transformedData = chunk.toString().toUpperCase();

        // Push the transformed data to the stream
        this.push(transformedData);

        // Signal the completion of processing the chunk
        callback();
    }
});

// Readable stream 'data' event handler
uppercaseTransformStream.on('data', (chunk) => {
    console.log(`Received transformed data: ${chunk}`);
});

// Write a classic "Princess Bride" quote to the Transform stream
uppercaseTransformStream.write('Have fun storming the castle!');
uppercaseTransformStream.end();