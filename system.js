// import os from "node:os";

// console.log("Operating system:", os.platform());
// console.log("Architecture:", os.arch());
// console.log("Free memory:", os.freemem());

import path from "node:path";

const filePath = "projects/backend/app.js";

console.log(path.basename(filePath));
console.log(path.extname(filePath));
console.log(path.dirname(filePath));