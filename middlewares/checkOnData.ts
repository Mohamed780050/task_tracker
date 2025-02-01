import fs from "fs/promises";
import path from "path";
export default async function checkOnData() {
  try {
    const files = await fs.readdir(path.join(process.cwd()));
    const exists = files.includes("data");
    if (!exists) {
      await fs.mkdir(path.join(process.cwd(), "data"));
      await fs.writeFile(
        path.join(process.cwd(), "data", "data.json"),
        JSON.stringify([])
      );
    }
    const dataExists = await fs.readdir(path.join(process.cwd(), "data"));
    dataExists.length === 0 &&
      fs.writeFile(
        path.join(process.cwd(), "data", "data.json"),
        JSON.stringify([])
      );
  } catch (err: any) {
    console.log(err);
  }
}
