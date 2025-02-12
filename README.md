# Task Tracker CLI

📚 Project Source

This project was created as part of [roadmap.sh](https://roadmap.sh/projects/task-tracker).

A simple command-line tool for tracking your tasks efficiently.


## 📌 Features
- Add, update, delete, and list tasks directly from the command line.
- Filter tasks based on their status (Done, In Progress, Not Started).

## 🚀 Commands

### 🔍 View Tasks
- `task` or `task list` → Display all tasks.
- `task list -d` or `task list --done` → Show completed tasks.
- `task list -i` or `task list --in-progress` → Show tasks that are in progress.
- `task list -n` or `task list --not-started` → Show tasks that haven’t started yet.

### ✍️ Manage Tasks
- `task add [title or titles]` → Add new task(s).
- `task update [id] -s done -t 'new title'` → Update a task's status and title.
- `task delete [id]` → Remove a task.

## 📖 Usage Example
```sh
# Add a new task
task add "Finish project documentation"

# List all tasks
task list

# Mark a task as done and update the title
task update 3 -s done -t "Submit project report"

# Delete a task
task delete 2
```
