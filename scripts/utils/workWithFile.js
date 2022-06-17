const fs = require("fs");

function write(address) {
  fs.writeFileSync("routerAddress.txt", address, "utf8");
}

function read() {
  const data = fs.readFileSync("routerAddress.txt", "utf8");
  return data;
}

module.exports = {
  write, read
}
