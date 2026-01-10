import fs from "fs";
import path from "path";

const filePath = path.resolve(__dirname, "../keys");

const publicKey = fs.readFileSync(filePath + "/public.pem", {
  encoding: "utf-8",
});
const privateKey = fs.readFileSync(filePath + "/private.pem", {
  encoding: "utf-8",
});

export { publicKey, privateKey };
