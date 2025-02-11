#!/usr/bin/env node
import checkOnData from "./middlewares/checkOnData.js";
import action from "./middlewares/actions.js";
import { checkNumber } from "./middlewares/checkNumber.js";

await checkOnData();
const commands = process.argv.slice(2);
const validCommands = ["list", "add", "delete", "update"];
const findCommand = commands.find((command) => validCommands.includes(command));
if (commands.length === 0 || findCommand === undefined) action.ListAllItems();
switch (findCommand) {
  case "list":
    commands[1]
      ? await action.ListAllItems(`${commands[1]}`)
      : await action.ListAllItems();
    break;
  case "add":
    const tasksTitle = commands.slice(1);
    if (!tasksTitle.length) console.log("Please enter a title for the task");
    else await action.AddItem(tasksTitle);
    break;
  case "update":
    const taskInfo = commands.slice(1);
    if (taskInfo.length === 1) {
      console.log("choose what to update");
      break;
    }
    const isANumber = checkNumber(taskInfo[0]);
    if (isANumber) {
      const params = taskInfo.slice(1);
      await action.updateTask(parseInt(taskInfo[0]), params);
    } else console.log("invalid Id");
    break;
  case "delete":
    const taskId = commands.slice(1);
    if (!taskId.length) {
      console.log("Id is required");
      break;
    }
    if (checkNumber(taskId[0])) {
      await action.deleteTask(parseInt(taskId[0]));
    } else console.log("Not a number");
}
