const express = require("express");
const app = express();
const port = 5000;

app.use(express.json());

// Data Source, could be replaced with a real database
const todos = [
  {
    id: 1,
    title: "Todo 1",
    desc: "This is my first Todo",
    completed: true,
  },
  {
    id: 2,
    title: "Todo 2",
    desc: "This is my second Todo",
    completed: true,
  },
  {
    id: 3,
    title: "Todo 3",
    desc: "This is my third Todo",
    completed: true,
  },
  {
    id: 4,
    title: "Todo 4",
    desc: "This is my fourth Todo",
    completed: true,
  },
  {
    id: 5,
    title: "Todo 5",
    desc: "This is my fifth Todo",
    completed: true,
  },
];
// Data source ends here

// Endpoint starts here
app.get("/", (request, response) => {
  response.status(200).send("Server is up and running...");
});

app.get("/todos", (request, response) => {
  response.status(200).json(todos);
});

app.get("/todos/:id", (request, response) => {
  console.log(todos.find((todo) => todo.id === +request.params.id));
  response
    .status(200)
    .json(todos.find((todo) => todo.id === +request.params.id));
});

app.post("/todos", (request, response) => {
  todos.push(request.body);
  response.status(201).json({ msg: "Todo created successfully" });
});

app.put("/todos/:id", (request, response) => {
  const todo = todos.find((todo) => todo.id === +request.params.id);
  if (todo) {
    const { title, desc, completed } = request.body;
    todo.title = title;
    todo.desc = desc;
    todo.completed = completed;
    response.status(200).json({ msg: "Todo updated sucessfully" });
    return;
  }
  response.status(404).json({ msg: "Todo not found" });
});

app.delete("/todos/:id", (request, response) => {
  const todoIndex = todos.findIndex((todo) => (todo.id == +request.params.id));
  if (todoIndex) {
    todos.splice(todoIndex, 1);
    response.status(200).json({ msg: "Todo deleted successfully" });
  }
  response.status(404).json({ msg: "Todo not found" });
});
// Endppoint ends here

// App listens to incoming requests here
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
