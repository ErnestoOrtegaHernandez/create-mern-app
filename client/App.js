import React, { useEffect, useState } from "react";
import axios from 'axios'
import Todo from './components/Todo.js'

const App = () => {

  const [todos, setTodos] = useState([])
  const [todo, setTodo] = useState({
                            title: '',
                            description: '',
                          })
  const [showAdd, setShowAdd] = useState(false);
  const [toggleRefresh, setToggleRefresh] = useState(false);

  const handleChange = (e)=>{
    setTodo({...todo, [e.target.name]: e.target.value})
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    if(todo.title.length > 0) {
      axios.post('/todos', todo)
      .then((data)=>{
        setToggleRefresh(!toggleRefresh)
        setShowAdd(false)
      })
      .catch((err)=> console.log(err))
    }
  }

  useEffect(()=>{
    axios.get('/todos')
    .then((list)=>{
      setTodos(list.data)
    })
    .catch((err)=>console.log(err))
  },[toggleRefresh])

  return (
    <div id = "App-container" className="bg-green-200 h-screen p-0 flex flex-col font-sans text-lg overflow-auto">
      {todos.length > 0 && todos.map((item,idx)=>{
        return <Todo _id = {item._id} title = {item.title} description = {item.description} completed = {item.completed} key= {idx} toggleRef ={()=>{
                                                                                                                                              console.log('clicked toggleRef')
                                                                                                                                              setToggleRefresh(!toggleRefresh)

                                                                                                                                            }}/>
      })}
      {showAdd && <form className = "bg-white p-5 mx-auto mt-5 rounded-3xl h-fit w-1/2 flex flex-col">
                    <label className = "flex p-1 m-1 basis-1/4"> Title:
                      <input className = "bg-slate-100 ml-2 basis-3/4" name = "title" type ="text" onChange = {handleChange}/>
                    </label> <br></br>
                    <label className = "flex p-1 m-1 basis-1/4"> Description:
                      <input className = "bg-slate-100 ml-2 basis-3/4"name = "description" type="text" onChange= {handleChange}/>
                    </label><br></br>
                    <button onClick = {handleSubmit} className = "flex p-2 bg-green-200 rounded-3xl h-auto w-1/2 justify-center mx-auto hover:bg-green-400">Submit</button>
                  </form>}
      <button className = "self-end bg-white rounded-3xl h-24 w-1/2 p-5 mx-auto mt-5 mb-5 hover:bg-green-400"onClick = {()=>{setShowAdd(!showAdd)}}>{showAdd ?'Cancel' : 'Add Todo'}</button>
    </div>
  )
};

export default App;