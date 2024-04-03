const fs = require("fs");

// Handling Error here is required
// if error is not handled,msg gets printed even if oldFile is not present
fs.rename("oldFile.txt", "newFile.txt", (err) => {
  if (err) throw err;
  console.log("Rename complete!");
});
