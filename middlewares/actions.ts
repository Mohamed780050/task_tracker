import fs from "fs/promises";
import path from "path";
import chalk from "chalk";
import Table from "cli-table3";
async function ListAllItems(query?: string) {
  const data = await fs.readFile(
    path.join(process.cwd(), "data", "data.json"),
    "utf-8"
  );
  // if there is not tasks
  if (!data.length) return console.log("No tasks");
  // create table
  const taskTable = new Table({
    head: [chalk.white("Id"), chalk.white("Title"), chalk.white("Status")],
    colAligns: ["center", "center", "center"],
  });
  // the tasks object
  const tasks: {
    id: string;
    title: string;
    status: "done" | "in progress" | "not started";
  }[] = JSON.parse(data);
  // showing tasks
  if (query === undefined) {
    tasks.forEach((task) => {
      switch (task.status) {
        case "done":
          taskTable.push([task.id, task.title, chalk.greenBright(task.status)]);
          break;
        case "in progress":
          taskTable.push([task.id, task.title, chalk.blue(task.status)]);
          break;
        default:
          taskTable.push([task.id, task.title, task.status]);
      }
    });
  } else {
    switch (query) {
      // done
      case "-d":
      case "--done":
        tasks.forEach((task) => {
          if (task.status === "done") {
            taskTable.push([
              task.id,
              task.title,
              chalk.greenBright(task.status),
            ]);
          }
        });
        break;
      // in progress
      case "-i":
      case "--in-progress":
        tasks.forEach((task) => {
          if (task.status === "in progress") {
            taskTable.push([task.id, task.title, chalk.blue(task.status)]);
          }
        });
        break;
      // not started
      case "-n":
      case "--not-started":
        tasks.forEach((task) => {
          if (task.status === "not started") {
            taskTable.push([task.id, task.title, task.status]);
          }
        });
      default:
        console.log("Invalid command");
        return;
    }
  }
  console.log(taskTable.toString());
}
async function AddItem(titles: string[]) {
  try {
    const jsonData = await fs.readFile(
      path.join(process.cwd(), "data", "data.json"),
      "utf-8"
    );
    const data = JSON.parse(jsonData);
    titles.forEach((title) =>
      data.push({ id: data.length + 1, title, status: "not started" })
    );
    await fs.writeFile(
      path.join(process.cwd(), "data", "data.json"),
      JSON.stringify(data)
    );
    console.log(chalk.green("Task added successfully"));
  } catch (err) {
    console.log(err);
  }
}
async function updateTask(id: number, params: string[]) {
  try {
    const jsonData = await fs.readFile(
      path.join(process.cwd(), "data", "data.json"),
      "utf-8"
    );
    const data: {
      id: number;
      title: string;
      status: "done" | "in progress" | "not started";
    }[] = JSON.parse(jsonData);
    const task = data.find((item) => item.id === id);
    if (!task) {
      console.log("Task is not found");
      return;
    }
    const otherTasks = data.filter((item) => item.id !== task.id);
    const commands = ["-t", "-s"];
    const statuses = ["done", "in progress", "not started"];
    const findCommands = params.filter((param) => commands.includes(param));
    findCommands.forEach((command, index) => {
      if (command === "-t") {
        task.title = params[(index + 1) * 2 - 1];
      } else {
        const paramValue = params[(index + 1) * 2 - 1];
        const check = statuses.includes(paramValue);
        check
          ? (task.status = paramValue as "done" | "in progress" | "not started")
          : console.log("Not a valid status");
      }
    });
    const updatedTasks = [...otherTasks, task];
    await fs.writeFile(
      path.join(process.cwd(), "data", "data.json"),
      JSON.stringify(updatedTasks.sort((a, b) => a.id - b.id))
    );
  } catch (err) {
    console.log(err);
  }
}
async function deleteTask(id: number) {
  try {
  } catch (err) {
    console.log(err);
  }
}
export default { ListAllItems, AddItem, updateTask };
