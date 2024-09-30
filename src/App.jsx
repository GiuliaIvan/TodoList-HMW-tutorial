import './App.css'
import { useEffect, useState } from 'react';
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";

function App() {
  const[isCompleteScreen, setIsCompleteScreen] = useState(false);
  const[allTodos, setTodos] = useState([]);
  const[newTitle, setNewTitle] = useState('');
  const[newDesc, setNewDesc] = useState('');

  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      desc: newDesc
    }

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr))
  }

  const handleDeleteTodo = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index);
    localStorage.setItem('todolist', JSON.stringify(reducedTodo))
    setTodos(reducedTodo);
  }

  useEffect(()=>{
    let savedTodo = JSON.parse(localStorage.getItem('todolist'));
    if(savedTodo){
      setTodos(savedTodo);
    }
  },[])

  return (
    <div className="App">
      <h1>My Todos</h1>

      <div className='todo-wrapper'>
        
        <div className='todo-input'>
          <div className='todo-input-item'>
            <label>Title</label>
            <input type='text' value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder='What is the task title?'/>
          </div>
          <div className='todo-input-item'>
            <label>Description</label>
            <input type='text' value={newDesc} onChange={(e)=>setNewDesc(e.target.value)} placeholder='What is the task description?'/>
          </div>
          <div className='todo-input-item'>
            <button type='button' onClick={handleAddTodo} className='primaryBtn'>Add</button>
          </div>
        </div>

        <div className='btn-area'>
          <button className={`secondaryBtn ${isCompleteScreen===false && 'active'}`} onClick={() => setIsCompleteScreen(false)}>Todo</button>
          <button className={`secondaryBtn ${isCompleteScreen===true && 'active'}`} onClick={() => setIsCompleteScreen(true)}>Completed</button>
        </div>

        <div className='todo-list'>
          {allTodos.map((item, index) => {
            return(
              <div className='todo-list-item' key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
                <div>
                  <AiOutlineDelete
                    className="icon"
                    onClick={() => handleDeleteTodo(index)}
                    title="Delete?"
                  />
                  <BsCheckLg
                    className="check-icon"
                    title="Complete?"
                  />
                </div>
              </div>
            )
          })}
          {/* <div className='todo-list-item'>
            <div>
              <h3>Task</h3>
              <p>Description</p>
            </div>
            <div>
              <AiOutlineDelete
                className="icon"
                title="Delete?"
              />
              <BsCheckLg
                className="check-icon"
                title="Complete?"
              />
            </div>
          </div> */}
        </div>

      </div>
    </div>
  )
}

export default App
