const express = require("express");
const app = express();
const PORT = 5000;

// Nested
const userRouter = express.Router();
// {mergeParams: true} to access params from the parent router
const itemRouter = express.Router({ mergeParams: true });

app.use("/users", userRouter);
userRouter.use('/:userId/items', itemRouter);
// nested routers by attaching them as middleware


userRouter.get('/', (req, res) => {
    res.send('All Users')
})
userRouter.get('/:userId', (req, res) => {
    res.send(`1 user details with user id ${req.params.userId}`)
})
itemRouter.get('/', (req, res) => {
    res.send(`All Items for user- ${req.params.userId}`)
})
itemRouter.get('/:itemId', (req, res) => {
    res.send(`Item details for User- ${req.params.userId} and item- ${req.params.itemId}`)
})

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});
