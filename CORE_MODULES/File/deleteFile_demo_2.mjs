import { unlink } from "node:fs/promises";

// await
try {
  await unlink("./tmp/hello");
  console.log("successfully deleted /tmp/hello");
} catch (error) {
  console.error("there was an error:", error.message);
}
