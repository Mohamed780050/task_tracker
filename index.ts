#!/usr/bin/env node
import checkOnData from "./middlewares/checkOnData.js";
import action from "./middlewares/actions.js";
await checkOnData();
const commands = process.argv.slice(2);
const validCommands = ["list", "add", "remove", "update"];
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
}
