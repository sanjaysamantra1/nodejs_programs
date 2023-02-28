fs.readFile("/file.md", (readFileErr, data) => {
  if (readFileErr) throw readFileErr;
  console.log(data);
  fs.unlink("/file.md", (unlinkErr) => {
    if (unlinkErr) throw unlinkErr;
  });
});
