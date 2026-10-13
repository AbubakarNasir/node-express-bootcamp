import os from "node:os";
import path from "node:path";

console.log("Operating system:", os.platform());
console.log("Architecture:", os.arch());
console.log("Free memory:", os.freemem());

const filePath = "projects/backend/app.js";

console.log(path.basename(filePath));
console.log(path.extname(filePath));
console.log(path.dirname(filePath));