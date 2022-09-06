const axios = require('axios').default;
const todos = require('../models/todos.js');

const getTodos = async (req, res) =>{
  await todos.find()
  .then((list) => {
    res.status(200).send(list)
    return;
  })
  .catch((error) => {
    console.log('Error getting todo list: ', error)
    res.status(400).send(error);
    return;
  })
}

const saveTodo = async (req, res) =>{
  await todos.create({ ...req.body })
  .then(() => {
    console.log('saved!')
    res.status(200).send(true)
    return;
  })
  .catch((error) => {
    console.log('Error saving todo: ', error)
    res.status(400).send(error);
    return;
  })
}

const updateTodo = async (req, res) =>{
  if(req.body.delete) {
    await todos.deleteOne({_id: req.body._id})
    .then(() => {
      console.log('Deleted!')
      res.status(200).send(true)
      return;
    })
    .catch((error) => {
      console.log('Error updating todo: ', error)
      res.status(400).send(error);
      return;
    })
  } else {
    console.log(req.body._id, 'id to be updated')
    await todos.findByIdAndUpdate(req.body._id, {title: req.body.title, description: req.body.description})
    .then((d) => {
      console.log('Updated!')
      res.status(200).send(true)
      return;
    })
    .catch((error) => {
      console.log('Error updating todo: ', error)
      res.status(400).send(error);
      return;
    })
  }
}

  module.exports.getTodos = getTodos;
  module.exports.saveTodo = saveTodo;
  module.exports.updateTodo = updateTodo;

