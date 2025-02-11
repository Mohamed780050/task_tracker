import fs from "fs/promises";
import os from "os";
import path from "path";
export default async function checkOnData() {
  try {
    const files = await fs.readdir(path.join(os.homedir()));
    const exists = files.includes("tasks database");
    if (!exists) {
      await fs.mkdir(path.join(os.homedir(), "tasks database"));
      await fs.writeFile(
        path.join(os.homedir(), "tasks database", "tasks.json"),
        JSON.stringify([])
      );
    }
    const dataExists = await fs.readdir(path.join(os.homedir(), "tasks database"));
    dataExists.length === 0 &&
      fs.writeFile(
        path.join(os.homedir(), "tasks database", "tasks.json"),
        JSON.stringify([])
      );
  } catch (err) {
    console.log(err);
  }
}
checkOnData();
