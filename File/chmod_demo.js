const fs = require('fs');

// Grant only read permission to user 
console.log("Granting only read access to user");
fs.chmod("example.txt", fs.constants.S_IRUSR, () => {

    // Reading the file 
    console.log("File Contents:", fs.readFileSync("example.txt", 'utf8'));

    // Trying to write to file 
    try {
        console.log("\nTrying to write to file");
        fs.writeFileSync('example.txt', "This file now has been edited.");
    }
    catch (e) {
        console.log("Error Occurred, Error Code:", e.code);
    }

    // Granting both read and write permission 
    console.log("\nGranting both read and write permission to user");
    fs.chmod("example.txt", fs.constants.S_IRUSR | fs.constants.S_IWUSR, () => {

        // Check the file mode 
        console.log("Current File Mode:", fs.statSync("example.txt").mode);

        console.log("Trying to write to file");
        fs.writeFileSync('example.txt', "This file now has been edited.");

        console.log("File Contents:", fs.readFileSync("example.txt", 'utf8'));
    });
}); 
