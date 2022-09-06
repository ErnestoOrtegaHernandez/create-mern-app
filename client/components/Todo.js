import React, { useState } from "react";
import axios from 'axios'

const Todo = ({_id, title, description, completed, toggleRef}) => {
  const [strike, setStrike] = useState(completed);
  const [edit, setEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(title)
  const [newDesc, setNewDesc] = useState(description)
  const strikeStyle = strike ? 'line-through ' : '';
  const deleteTodo = ()=>{
    axios.put('/todos', { _id: _id, delete: true })
    .then((data)=>{
      toggleRef()
    })
    .catch((err)=>console.log(err, 'trouble deleting'))
  }
  const saveEdit = ()=>{
    axios.put('/todos', {_id: _id, title: newTitle, description: newDesc})
    .then((data)=>{
      setEdit(!edit)
    })
    .catch((err)=>console.log(err, 'trouble saving'))
  }

  return (<div className = 'h-36 flex flex-row p-5 mx-auto mt-5 text-left bg-white w-1/2 rounded-3xl items-start'>
            <input type="checkbox" className = "flex mr-5 mt-3"checked = {strike} onChange = {()=>{setStrike(!strike)}}/>
            <div className = 'flex flex-col'>
              {!edit && <p className = {strikeStyle + 'text-2xl items-start font-bold'}>{title}</p>}
              {!edit && <p className = {strikeStyle + 'text-lg'}>{description}</p>}
              {edit && <input type = "text" onChange = {(e)=>{setNewTitle(e.target.value)}} value = {newTitle} name = "title" className = "text-2xl items-start font-bold bg-slate-100 w-3/4"/>}
              {edit && <input type = "text" onChange = {(e)=>{setNewDesc(e.target.value)}} value = {newDesc} name = "description" className = "text-lg bg-slate-100 w-3/4"/>}
              {edit && <button onClick = {saveEdit} className = "mt-3 self-center rounded-2xl w-1/2 bg-green-100 hover:bg-green-200">Save Edit</button>}
            </div>
            <div className = 'flex flex-row mr-2 ml-auto'>
              <p onClick = {()=>{setEdit(!edit)}} className = "flex basis-auto bg-blue-100 p-1 rounded-lg w-16 justify-center mr-2 ml-auto hover:cursor-pointer">{edit ? 'Cancel' : 'Edit'}</p>
              <p onClick = {deleteTodo} className = "basis-auto bg-red-100 p-1 rounded-lg w-8 text-center mr-2 ml-auto hover:cursor-pointer">X</p>
            </div>
        </div>)
};

export default Todo;