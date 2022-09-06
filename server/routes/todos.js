const express = require("express");
const router = express.Router();
const todos = require("../../database/controllers/todos.js");

router.get("/", todos.getTodos);
router.post("/", todos.saveTodo);
router.put("/", todos.updateTodo);

module.exports = router;