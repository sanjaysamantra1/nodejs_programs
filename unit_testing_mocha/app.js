const express = require("express");
const randomId = require("random-id");
const app = express();
const bodyParser = require("body-parser");
const port = 5000;

connectToDB = ()=>{
  if(process.env.NODE_ENV === 'development'){
    console.log('COnnet to Dev DB')
    // mongo.connect(URL)
  }else if(process.env.NODE_ENV === 'test'){
    console.log('COnnet to TEST DB')
  }else{
    console.log('COnnet to PROD DB')
  }
}

// place holder for the data
let tasks = [
  {
    id: 1,
    task: "task1",
    assignee: "assignee1000",
    status: "completed",
  },
  {
    id: 2,
    task: "task2",
    assignee: "assignee1001",
    status: "completed",
  },
  {
    id: 3,
    task: "task3",
    assignee: "assignee1002",
    status: "completed",
  },
  {
    id: 4,
    task: "task4",
    assignee: "assignee1000",
    status: "completed",
  }
];

app.use(bodyParser.json());

app.get("/todos", (req, res) => {
  connectToDB();
  console.log("api/todos called!!!!!");
  res.json(tasks);
});

app.get("/todos/:id", (req, res) => {
  console.log("api/todos/:id called!!!!!");
  const filteredTodo = tasks.filter((todo) => todo.id === +req.params.id);
  res.json(filteredTodo);
});

app.post("/todo", (req, res) => {
  console.log('Add To Do')
  const task = req.body.task;
  task.id = randomId(10);
  tasks.push(task);
  res.json(tasks);
});

app.delete("/todo/:id", (req, res) => {
  console.log("Id to delete:::::", req.params.id);
  tasks = tasks.filter((task) => task.id != req.params.id);
  res.json(tasks);
  console.table(tasks)
});

app.put("/todos/:id", (req, res) => {
  console.log("Id to update:::::", req.params.id);
  const taskToUpdate = req.body.task;
  tasks = tasks.map((task) => {
    if (task.id == req.params.id) {
      task = taskToUpdate;
      task.id = parseInt(req.params.id);
    }
    return task;
  });
  res.json(tasks);
});

app.get("/health", (req, res) => {
  res.send(`<h1>API Running on port ${port}</h1>`);
});

app.listen(port, () => {
  console.log(`Server listening on the port::::::${port}`);
});
