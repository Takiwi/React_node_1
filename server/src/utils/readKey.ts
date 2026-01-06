import fs from "fs";

const publicKey = fs.readFileSync("../keys/public.pem", { encoding: "utf-8" });
const privateKey = fs.readFileSync("../keys/private.pem", {
  encoding: "utf-8",
});

export { publicKey, privateKey };
